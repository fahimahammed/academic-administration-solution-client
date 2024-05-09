import { ActionBar, BreadCrumbsComp, PHUDrawer, SearchInput } from '@/ui';
import { IError, IOfferedCourse, IOfferedCourseSchedule, IRoom, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { ColumnsType } from 'antd/es/table';
import { Button, Tooltip } from 'antd';
import PHUModal from '@/ui/PHUModal';
import PHUTable from '@/ui/PHUTable';
import LinkButton from '@/ui/LinkButton';
import { DeleteOutlined, EditOutlined, ReloadOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons';
import PHUButton from '@/ui/PHUButton';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import FilterOptions from './filter-options/FilterOptions';
import { IOfferedCourseSection } from '@/types/offered-course-section';
import { setDefault, setSort } from '@/redux/slices/offeredCourseScheduleSlice';
import {
	useDeleteOfferedCourseScheduleMutation,
	useOfferedCourseSchedulesQuery,
} from '@/redux/apis/offeredCourseScheduleApi';
import { IAcademicCoreFaculty } from '@/types/academic/faculty';

const ViewOfferedCourseSchedule = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [offeredCourseScheduleId, setOfferedCourseScheduleId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const offeredCourseScheduleState = useSelector((state: RootState) => state.offeredCourseSchedule);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);

	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!searchTerm ||
			!!offeredCourseScheduleState?.sortBy ||
			!!offeredCourseScheduleState?.sortOrder ||
			!!offeredCourseScheduleState?.filterOptions?.academicDepartmentId ||
			!!offeredCourseScheduleState?.filterOptions?.offeredCourseId ||
			!!offeredCourseScheduleState?.filterOptions?.semesterRegistrationId ||
			!!offeredCourseScheduleState?.filterOptions?.offeredCourseSectionId
		);
	}, [
		offeredCourseScheduleState?.filterOptions?.academicDepartmentId,
		offeredCourseScheduleState?.filterOptions?.offeredCourseId,
		offeredCourseScheduleState?.filterOptions?.offeredCourseSectionId,
		offeredCourseScheduleState?.filterOptions?.semesterRegistrationId,
		offeredCourseScheduleState?.sortBy,
		offeredCourseScheduleState?.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	if (!!offeredCourseScheduleState?.sortBy) query['sortBy'] = offeredCourseScheduleState?.sortBy;
	if (!!offeredCourseScheduleState?.sortOrder) query['sortOrder'] = offeredCourseScheduleState?.sortOrder;
	if (!!offeredCourseScheduleState?.filterOptions?.academicDepartmentId)
		query['academicDepartmentId'] = offeredCourseScheduleState?.filterOptions?.academicDepartmentId;
	if (!!offeredCourseScheduleState?.filterOptions?.offeredCourseId)
		query['offeredCourseId'] = offeredCourseScheduleState?.filterOptions?.offeredCourseId;
	if (!!offeredCourseScheduleState?.filterOptions?.semesterRegistrationId)
		query['semesterRegistrationId'] = offeredCourseScheduleState?.filterOptions?.semesterRegistrationId;

	if (!!offeredCourseScheduleState?.filterOptions?.offeredCourseSectionId)
		query['offeredCourseSectionId'] = offeredCourseScheduleState?.filterOptions?.offeredCourseSectionId;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useOfferedCourseSchedulesQuery({ ...query });
	const [deleteOfferedCourseSchedule] = useDeleteOfferedCourseScheduleMutation();

	const offeredCourseSchedules = data?.offeredCourseSchedules;
	const meta = data?.meta;

	const deleteOfferedCourseScheduleHandler = async (id: string) => {
		try {
			await deleteOfferedCourseSchedule(id).unwrap();
			notifySuccess('course schedule deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IOfferedCourseSchedule> = [
		{
			title: 'Day of week',
			dataIndex: 'dayOfWeek',
			sorter: true,
		},
		{
			title: 'Start time',
			dataIndex: 'startTime',
			sorter: true,
		},
		{
			title: 'End time',
			dataIndex: 'endTime',
			sorter: true,
		},
		{
			title: 'Section',
			dataIndex: 'offeredCourseSection',
			sorter: true,
			render: function (data: IOfferedCourseSection) {
				return <>{data.title}</>;
			},
		},
		{
			title: 'Faculty',
			dataIndex: 'faculty',
			render: function (data: IAcademicCoreFaculty) {
				return (
					<>
						{data.firstName} {data.lastName}
					</>
				);
			},
		},
		{
			title: 'Room',
			dataIndex: 'room',
			sorter: true,
			render: function (data: IRoom) {
				return <>{data.roomNumber}</>;
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
							link={`/admin/offered-course-schedule/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/offered-course-schedule/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setOfferedCourseScheduleId(data);
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
					{ label: 'offered course schedule', link: '/admin/offered-course-schedule' },
				]}
			/>
			<ActionBar title="course schedule list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/admin/offered-course-schedule/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create course schedule</span>
				</LinkButton>

				<Tooltip title="filter" placement="bottom">
					<Button onClick={() => setOpenFilterDrawer(true)} size="large" style={{ marginLeft: '5px' }}>
						<FilterOutlined />
					</Button>
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
				dataSource={offeredCourseSchedules}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="remove course schedule"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteOfferedCourseScheduleHandler(offeredCourseScheduleId)}
			>
				<p className="my-5">Do you want to remove this course schedule?</p>
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

export default ViewOfferedCourseSchedule;
