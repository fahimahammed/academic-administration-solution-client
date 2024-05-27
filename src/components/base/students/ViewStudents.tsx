import { useDeleteStudentMutation, useStudentsQuery } from '@/redux/apis/base-admin/student/studentApi';
import { ActionBar, BreadCrumbsComp, PHUDrawer, SearchInput } from '@/ui';
import { IError, IStudent, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import PHUTable from '@/ui/PHUTable';
import PHUModal from '@/ui/PHUModal';
import type { ColumnsType } from 'antd/es/table';
import LinkButton from '@/ui/LinkButton';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, FilterOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import FilterOptions from './filter-options/FilterOptions';
import PHUButton from '@/ui/PHUButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { setDefault, setSort } from '@/redux/slices/studentSlice';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';


const ViewStudents = ({ base }: { base?: string }) => {
	const dispatch = useDispatch();
	const studentState = useSelector((state: RootState) => state.student);
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
	const [studentId, setStudentId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!studentState.filterOptions.gender ||
			!!studentState.filterOptions.bloodGroup ||
			!!studentState.filterOptions.academicDepartment ||
			!!studentState.filterOptions.academicSemester ||
			!!studentState.filterOptions.academicFaculty ||
			!!studentState.sortBy ||
			!!studentState.sortOrder ||
			!!searchTerm
		);
	}, [
		studentState.filterOptions.gender,
		studentState.filterOptions.bloodGroup,
		studentState.filterOptions.academicDepartment,
		studentState.filterOptions.academicSemester,
		studentState.filterOptions.academicFaculty,
		studentState.sortBy,
		studentState.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	query['gender'] = studentState.filterOptions.gender;
	query['bloodGroup'] = studentState.filterOptions.bloodGroup;
	query['academicDepartmentId'] = studentState.filterOptions.academicDepartment;
	query['academicSemesterId'] = studentState.filterOptions.academicSemester;
	query['academicFacultyId'] = studentState.filterOptions.academicFaculty;
	query['sortBy'] = studentState.sortBy;
	query['sortOrder'] = studentState.sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useStudentsQuery({ ...query });
	const [deleteStudent] = useDeleteStudentMutation();

	const students = data?.students;
	const meta = data?.meta;

	const deleteStudentHandler = async (id: string) => {
		try {
			await deleteStudent(id).unwrap();
			//console.log(res);
			notifySuccess('Student deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IStudent> = [
		{
			title: 'Id',
			dataIndex: 'userId',
			sorter: true,
		},
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
			sorter: true
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
			title: 'Contact no.',
			dataIndex: 'contactNo',
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			sorter: true,
		},
		{
			title: 'Action',
			dataIndex: 'userId',
			render: function (data: string) {
				return (
					<>
						<LinkButton
							link={`/${base}/student/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>

						<LinkButton
							link={`/${base}/student/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setStudentId(data);
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

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IStudent>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'student', link: `/${base}/student` },
				]}
			/>

			<ActionBar title="student list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link={`/${base}/student/create`}
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>Create Student</span>
				</LinkButton>

				<Tooltip title="filter" placement="bottom">
					<PHUButton onClick={() => setOpenFilterDrawer(true)} size="large" style={{ marginLeft: '5px' }}>
						<FilterOutlined />
					</PHUButton>
				</Tooltip>

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
				dataSource={students}
				pageSize={size}
				totalPages={meta?.total}
				showSizeChanger
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="Remove Student"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteStudentHandler(studentId)}
			>
				<div>
					<p className="my-5">Do you want to remove this student?</p>
				</div>
			</PHUModal>

			<PHUDrawer
				open={openFilterDrawer}
				title="Filtering options"
				width={450}
				onClose={() => {
					setOpenFilterDrawer(false);
				}}
			>
				<FilterOptions />
			</PHUDrawer>
		</>
	);
};

export default ViewStudents;
