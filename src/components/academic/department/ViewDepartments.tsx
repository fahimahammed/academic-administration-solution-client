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
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime } from '@/utils/datetime-converter';
import { IAcademicFaculty } from '@/types/academic/faculty';
import { useAcademicDepartmentsQuery, useDeleteAcademicDepartmentMutation } from '@/redux/apis/academic/departmentApi';
import FacultyFilter from './filter-options/FacultyFilter';
import { RootState } from '@/redux';
import { setDefault, setSort } from '@/redux/slices/academic/departmentSlice';
import LinkButton from '@/ui/LinkButton';
import { SorterResult } from 'antd/es/table/interface';
import { IAcademicDepartment } from '@/types/academic/department';

const ViewDepartments = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const departmentState = useSelector((state: RootState) => state.academicDepartment);
	const [open, setOpen] = useState<boolean>(false);
	const [academicDepartmentId, setAcademicDepartmentId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!searchTerm ||
			!!departmentState?.filterOptions?.academicFaculty ||
			!!departmentState?.sortBy ||
			!!departmentState?.sortOrder
		);
	}, [departmentState?.filterOptions?.academicFaculty, departmentState?.sortBy, departmentState?.sortOrder, searchTerm]);

	query['limit'] = size;
	query['page'] = page;
	query['academicFaculty'] = departmentState?.filterOptions?.academicFaculty;
	query['sortBy'] = departmentState?.sortBy;
	query['sortOrder'] = departmentState?.sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useAcademicDepartmentsQuery({ ...query });
	const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();

	const academicDepartments = data?.academicDepartments;
	const meta = data?.meta;

	const deleteAcademicDepartmentHandler = async (id: string) => {
		try {
			await deleteAcademicDepartment(id).unwrap();
			notifySuccess('Academic department deleted successfully');
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
			title: 'Faculty',
			dataIndex: 'academicFaculty',
			render: function (data: IAcademicFaculty) {
				return <>{data?.title}</>;
			},
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
			render: function (data: IAcademicDepartment) {
				return (
					<>
						<LinkButton
							link={`/admin/academic/department/details/${data.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>

						<LinkButton
							link={`/admin/academic/department/edit/${data.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setAcademicDepartmentId(data.id);
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
		dispatch(setDefault());
		setSearchTerm('');
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IAcademicFaculty>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'department', link: '/admin/academic/department' },
				]}
			/>
			<ActionBar title="academic department list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>

				<FacultyFilter />

				<LinkButton
					link="/admin/academic/department/create"
					customStyle={{
						margin: '0px 5px',
						padding: '10px 20px',
					}}
				>
					<span>create department</span>
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
				dataSource={academicDepartments}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="Remove Academic Department"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteAcademicDepartmentHandler(academicDepartmentId)}
			>
				<p className="my-5">Do you want to remove this academic department?</p>
			</PHUModal>
		</>
	);
};

export default ViewDepartments;
