import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IError, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { ColumnsType } from 'antd/es/table';
import { Button, Tooltip } from 'antd';
import PHUModal from '@/ui/PHUModal';
import PHUTable from '@/ui/PHUTable';
import { DeleteOutlined, EditOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import PHUButton from '@/ui/PHUButton';
import { formatDateTime } from '@/utils/datetime-converter';
import { useAcademicFacultiesQuery, useDeleteAcademicFacultyMutation } from '@/redux/apis/academic/facultyApi';
import { IAcademicFaculty } from '@/types/academic/faculty';
import LinkButton from '@/ui/LinkButton';
import { SorterResult } from 'antd/es/table/interface';

const ViewFaculties = () => {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [academicFacultyId, setAcademicFacultyId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm || sortBy || sortOrder;
	}, [searchTerm, sortBy, sortOrder]);

	query['limit'] = size;
	query['page'] = page;
	query['sortBy'] = sortBy;
	query['sortOrder'] = sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useAcademicFacultiesQuery({ ...query });
	const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();

	const academicFaculties = data?.academicFaculties;
	const meta = data?.meta;

	const deleteAcademicFacultyHandler = async (id: string) => {
		try {
			await deleteAcademicFaculty(id);
			notifySuccess('Academic faculty deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IAcademicFaculty> = [
		{
			title: 'Title',
			dataIndex: 'title',
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			render: function (data: string) {
				return <>{formatDateTime(data)}</>;
			},
			sorter: true,
		},
		{
			title: 'Action',
			render: function (data: IAcademicFaculty) {
				return (
					<>
						<LinkButton
							link={`/admin/academic/faculty/details/${data.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>

						<LinkButton
							link={`/admin/academic/faculty/edit/${data.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setAcademicFacultyId(data.id);
							}}
							danger
							style={{ marginLeft: '3px' }}
						>
							<DeleteOutlined />
						</Button>
					</>
				);
			},
		},
	];

	const onPaginationChange = (page: number, size: number) => {
		setSize(size);
		setPage(page);
	};

	const resetAllFilter = () => {
		setSearchTerm('');
		setSortBy('');
		setSortOrder('');
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IAcademicFaculty>) => {
		const { order, field } = sorter;
		setSortBy(field as string);
		setSortOrder(order === 'ascend' ? 'asc' : 'desc');
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'faculty', link: '/admin/academic/faculty' },
				]}
			/>
			<ActionBar title="academic faculty list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/admin/academic/faculty/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>Create Faculty</span>
				</LinkButton>

				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<PHUButton onClick={resetAllFilter} size="large" style={{ marginLeft: '5px' }}>
							<ReloadOutlined />
						</PHUButton>
					</Tooltip>
				) : null}
			</ActionBar>

			<PHUTable
				loading={isLoading}
				columns={columns}
				dataSource={academicFaculties}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="remove academic faculty"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteAcademicFacultyHandler(academicFacultyId)}
			>
				<p className="my-5">Do you want to remove this academic faculty?</p>
			</PHUModal>
		</>
	);
};

export default ViewFaculties;
