import { ActionBar, BreadCrumbsComp, Drawer, SearchInput } from '@/ui';
import { IError, IOfferedCourse, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { ColumnsType } from 'antd/es/table';
import { Button, Tooltip } from 'antd';
import Modal from '@/ui/Modal';
import Table from '@/ui/Table';
import LinkButton from '@/ui/LinkButton';
import { DeleteOutlined, EditOutlined, ReloadOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons';
import Button from '@/ui/Button';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { useDeleteOfferedCourseMutation, useOfferedCoursesQuery } from '@/redux/apis/offeredCourseApi';
import { setDefault, setSort } from '@/redux/slices/offeredCourseSlice';
import FilterOptions from './filter-options/FilterOptions';

const ViewOfferedCourse = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [offeredCourseId, setOfferedCourseId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const offeredCourseState = useSelector((state: RootState) => state.offeredCourse);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);

	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!searchTerm ||
			!!offeredCourseState?.sortBy ||
			!!offeredCourseState?.sortOrder ||
			!!offeredCourseState?.filterOptions?.academicDepartmentId ||
			!!offeredCourseState?.filterOptions?.courseId ||
			!!offeredCourseState?.filterOptions?.semesterRegistrationId
		);
	}, [
		offeredCourseState?.filterOptions?.academicDepartmentId,
		offeredCourseState?.filterOptions?.courseId,
		offeredCourseState?.filterOptions?.semesterRegistrationId,
		offeredCourseState?.sortBy,
		offeredCourseState?.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	if (!!offeredCourseState?.sortBy) query['sortBy'] = offeredCourseState?.sortBy;
	if (!!offeredCourseState?.sortOrder) query['sortOrder'] = offeredCourseState?.sortOrder;
	if (!!offeredCourseState?.filterOptions?.academicDepartmentId)
		query['academicDepartmentId'] = offeredCourseState?.filterOptions?.academicDepartmentId;
	if (!!offeredCourseState?.filterOptions?.courseId) query['courseId'] = offeredCourseState?.filterOptions?.courseId;
	if (!!offeredCourseState?.filterOptions?.semesterRegistrationId)
		query['semesterRegistrationId'] = offeredCourseState?.filterOptions?.semesterRegistrationId;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useOfferedCoursesQuery({ ...query });
	const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();

	const offeredCourses = data?.offeredCourses;
	const meta = data?.meta;

	const deleteOfferedCourseHandler = async (id: string) => {
		try {
			await deleteOfferedCourse(id).unwrap();
			notifySuccess('offered course deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IOfferedCourse> = [
		{
			title: 'Course',
			dataIndex: 'course',
			sorter: true,
			render: function (data) {
				return <>{data.title}</>;
			},
		},
		{
			title: 'Academic department',
			dataIndex: 'academicDepartment',
			sorter: true,
			render: function (data) {
				return <>{data.title}</>;
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
			dataIndex: 'id',
			render: function (data: string) {
				return (
					<>
						<LinkButton
							link={`/admin/offered-course/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/offered-course/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setOfferedCourseId(data);
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
		dispatch(setDefault());
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IOfferedCourse>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered course', link: '/admin/offered-course' },
				]}
			/>
			<ActionBar title="offered course list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/admin/offered-course/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create offered course</span>
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
				dataSource={offeredCourses}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="remove offered course"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteOfferedCourseHandler(offeredCourseId)}
			>
				<p className="my-5">Do you want to remove this offered course?</p>
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

export default ViewOfferedCourse;
