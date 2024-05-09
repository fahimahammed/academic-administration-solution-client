import { ActionBar, BreadCrumbsComp, Drawer, SearchInput } from '@/ui';
import { IError, IFaculty, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { useDeleteFacultyMutation, useFacultiesQuery } from '@/redux/apis/base-admin/faculty/facultyApi';
import Table from '@/ui/Table';
import Modal from '@/ui/Modal';
import LinkButton from '@/ui/LinkButton';
import { Button, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Button from '@/ui/Button';
import { DeleteOutlined, EditOutlined, FilterOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import FilterOptions from './filter-options/FilterOptions';
import { setDefault, setSort } from '@/redux/slices/facultySlice';
import { IAcademicDepartment } from '@/types/academic/department';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';

const ViewFaculties = ({ base }: { base?: string }) => {
	const dispatch = useDispatch();
	const facultyState = useSelector((state: RootState) => state.faculty);
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
	const [facultyId, setFacultyId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!facultyState.filterOptions.gender ||
			!!facultyState.filterOptions.bloodGroup ||
			!!facultyState.filterOptions.academicDepartment ||
			!!facultyState.sortBy ||
			!!facultyState.sortOrder ||
			!!searchTerm
		);
	}, [
		facultyState.filterOptions.bloodGroup,
		facultyState.filterOptions.academicDepartment,
		facultyState.filterOptions.gender,
		facultyState.sortBy,
		facultyState.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	query['gender'] = facultyState.filterOptions.gender;
	query['bloodGroup'] = facultyState.filterOptions.bloodGroup;
	query['academicDepartment'] = facultyState.filterOptions.academicDepartment;
	query['sortBy'] = facultyState.sortBy;
	query['sortOrder'] = facultyState.sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useFacultiesQuery({ ...query });
	const [deleteFaculty] = useDeleteFacultyMutation();

	const faculties = data?.faculties;
	const meta = data?.meta;

	const deleteFacultyHandler = async (id: string) => {
		try {
			await deleteFaculty(id);
			notifySuccess('Faculty deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IFaculty> = [
		{
			title: 'Name',
			render: function (data: Record<string, string>) {
				const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
				return <>{fullName}</>;
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Department',
			dataIndex: 'academicDepartment',
			render: function (data: IAcademicDepartment) {
				return <>{data.title}</>;
			},
		},
		{
			title: 'Designation',
			dataIndex: 'designation',
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
			dataIndex: 'facultyId',
			render: function (data: string) {
				return (
					<>
						<LinkButton
							link={`/${base}/faculty/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/${base}/faculty/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setFacultyId(data);
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

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IFaculty>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'faculty', link: `/${base}/faculty` },
				]}
			/>

			<ActionBar title="faculty list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>

				<LinkButton
					link={`/${base}/faculty/create`}
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create faculty</span>
				</LinkButton>
				<Tooltip title="filter" placement="bottom">
					<Button onClick={() => setOpenFilterDrawer(true)} size="large" style={{ marginLeft: '5px' }}>
						<FilterOutlined />
					</Button>
				</Tooltip>

				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<Button onClick={resetAllFilter} size="large" style={{ marginLeft: '5px' }}>
							<ReloadOutlined />
						</Button>
					</Tooltip>
				) : null}
			</ActionBar>

			<Table
				loading={isLoading}
				columns={columns}
				dataSource={faculties}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="remove permission"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteFacultyHandler(facultyId)}
			>
				<p className="my-5">Do you want to remove this permission?</p>
			</Modal>

			<Drawer
				open={openFilterDrawer}
				title="Filtering options"
				width={450}
				onClose={() => {
					setOpenFilterDrawer(false);
				}}
			>
				<FilterOptions />
			</Drawer>
		</>
	);
};

export default ViewFaculties;
