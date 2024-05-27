import { ActionBar, BreadCrumbsComp, PHUDrawer, SearchInput } from '@/ui';
import { IError, IOfferedCourse, QueryParamsType } from '@/types';
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
import { useDeleteOfferedCourseSectionMutation, useOfferedCourseSectionsQuery } from '@/redux/apis/offerdCourseSectionApi';
import { setDefault, setSort } from '@/redux/slices/offeredCourseSectionSlice';

const ViewOfferedCourseSection = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [offeredCourseSectionId, setOfferedCourseSectionId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const offeredCourseSectionState = useSelector((state: RootState) => state.offeredCourseSection);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!searchTerm ||
			!!offeredCourseSectionState?.sortBy ||
			!!offeredCourseSectionState?.sortOrder ||
			!!offeredCourseSectionState?.filterOptions?.academicDepartmentId ||
			!!offeredCourseSectionState?.filterOptions?.offeredCourseId ||
			!!offeredCourseSectionState?.filterOptions?.semesterRegistrationId
		);
	}, [
		offeredCourseSectionState?.filterOptions?.academicDepartmentId,
		offeredCourseSectionState?.filterOptions?.offeredCourseId,
		offeredCourseSectionState?.filterOptions?.semesterRegistrationId,
		offeredCourseSectionState?.sortBy,
		offeredCourseSectionState?.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	if (!!offeredCourseSectionState?.sortBy) query['sortBy'] = offeredCourseSectionState?.sortBy;
	if (!!offeredCourseSectionState?.sortOrder) query['sortOrder'] = offeredCourseSectionState?.sortOrder;
	if (!!offeredCourseSectionState?.filterOptions?.academicDepartmentId)
		query['academicDepartmentId'] = offeredCourseSectionState?.filterOptions?.academicDepartmentId;

	if (!!offeredCourseSectionState?.filterOptions?.semesterRegistrationId)
		query['semesterRegistrationId'] = offeredCourseSectionState?.filterOptions?.semesterRegistrationId;
	if (!!offeredCourseSectionState?.filterOptions?.offeredCourseId)
		query['offeredCourseId'] = offeredCourseSectionState?.filterOptions?.offeredCourseId;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useOfferedCourseSectionsQuery({ ...query });
	const [deleteOfferedCourseSection] = useDeleteOfferedCourseSectionMutation();

	const offeredCourses = data?.offeredCourseSections;
	const meta = data?.meta;

	const deleteOfferedCourseSectionHandler = async (id: string) => {
		try {
			await deleteOfferedCourseSection(id).unwrap();
			notifySuccess('offered course section deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IOfferedCourseSection> = [
		{
			title: 'Offered Courese',
			dataIndex: 'offeredCourse',
			sorter: true,
			render: function (data) {
				return <>{data.course.title}</>;
			},
		},
		{
			title: 'Section',
			dataIndex: 'title',
			sorter: true,
		},
		{
			title: 'Max Capacity',
			dataIndex: 'maxCapacity',
			sorter: true,
		},
		{
			title: 'Currently Enrolled Student',
			dataIndex: 'currentlyEnrolledStudent',
			sorter: true,
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
							link={`/admin/offered-course-section/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/offered-course-section/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setOfferedCourseSectionId(data);
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
					{ label: 'offered course section', link: '/admin/offered-course-section' },
				]}
			/>
			<ActionBar title="course section list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/admin/offered-course-section/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>Create Course Section</span>
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
				dataSource={offeredCourses}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="Remove Course Section"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteOfferedCourseSectionHandler(offeredCourseSectionId)}
			>
				<p className="my-5">Do you want to remove this course section?</p>
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

export default ViewOfferedCourseSection;
