import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { ICourse, IDepartment, IError, ISemesterRegistration, QueryParamsType } from '@/types';
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
import { DeleteOutlined, EditOutlined, ReloadOutlined, EyeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import Button from '@/ui/Button';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useDeleteCourseMutation } from '@/redux/apis/courseApi';
import { useSemesterRegistrationsQuery, useStartNewSemesterMutation } from '@/redux/apis/semesterRegistrationApi';
import AcademicSemesterFilter from './filter-options/AcademicSemesterFilter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { setDefault, setSort } from '@/redux/slices/academic/coreSemesterSlice';

const ViewSemesterRegistration = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [openNewSemeter, setOpenNewSemeter] = useState<boolean>(false);
	const [semesterRegistrationId, setSemesterRegistrationId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const academicCoreSemesterState = useSelector((state: RootState) => state.academicCoreSemester);
	const [startNewSemester] = useStartNewSemesterMutation();

	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!searchTerm ||
			!!academicCoreSemesterState?.sortBy ||
			!!academicCoreSemesterState?.sortOrder ||
			!!academicCoreSemesterState?.filterOptions?.academicSemesterId
		);
	}, [
		academicCoreSemesterState?.filterOptions?.academicSemesterId,
		academicCoreSemesterState?.sortBy,
		academicCoreSemesterState?.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	if (!!academicCoreSemesterState?.sortBy) query['sortBy'] = academicCoreSemesterState?.sortBy;
	if (!!academicCoreSemesterState?.sortOrder) query['sortOrder'] = academicCoreSemesterState?.sortOrder;
	query['academicSemesterId'] = academicCoreSemesterState?.filterOptions?.academicSemesterId;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useSemesterRegistrationsQuery({ ...query });
	const [deleteCourse] = useDeleteCourseMutation();

	const semesterRegistrations = data?.semesterRegistrations;
	const meta = data?.meta;

	const deleteSemesterRegistrationHandler = async (id: string) => {
		try {
			await deleteCourse(id).unwrap();
			notifySuccess('course deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const startNewSemesterHandler = async (id: string) => {
		try {
			const res = await startNewSemester(id).unwrap();
			notifySuccess(res.message);
			setOpenNewSemeter(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<ICourse> = [
		{
			title: 'Start date',
			dataIndex: 'startDate',
			render: function (data: string) {
				return <>{formatDateTime(data, 'MMM D, YYYY hh:mm A')}</>;
			},
			sorter: true,
		},
		{
			title: 'End date',
			dataIndex: 'endDate',
			render: function (data: string) {
				return <>{formatDateTime(data, 'MMM D, YYYY hh:mm A')}</>;
			},
			sorter: true,
		},
		{
			title: 'Statue',
			dataIndex: 'status',
			sorter: true,
		},
		{
			title: 'Academic semester',
			dataIndex: 'academicSemester',
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
			render: function (data: ISemesterRegistration) {
				return (
					<>
						<LinkButton
							link={`/admin/semester-registration/details/${data?.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/semester-registration/edit/${data?.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						{data?.status === 'ENDED' ? (
							<Tooltip title="start new semester" placement="bottom">
								<Button
									type="primary"
									onClick={() => {
										setOpenNewSemeter(true);
										setSemesterRegistrationId(data?.id);
									}}
									style={{ marginLeft: '3px' }}
								>
									<PlayCircleOutlined />
								</Button>
							</Tooltip>
						) : null}

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setSemesterRegistrationId(data?.id);
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

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IDepartment>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'semester-registration', link: '/admin/semester-registration' },
				]}
			/>
			<ActionBar title="semester registration list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<AcademicSemesterFilter />
				<LinkButton
					link="/admin/semester-registration/create"
					customStyle={{
						marginLeft: '5px',
						padding: '10px 20px',
					}}
				>
					<span>create semester registration</span>
				</LinkButton>

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
				dataSource={semesterRegistrations}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="remove semester registration"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteSemesterRegistrationHandler(semesterRegistrationId)}
			>
				<p className="my-5">Do you want to remove this semester registration?</p>
			</Modal>

			<Modal
				title="start new semester"
				isOpen={openNewSemeter}
				closeModal={() => setOpenNewSemeter(false)}
				handleOk={() => startNewSemesterHandler(semesterRegistrationId)}
			>
				<p className="my-5">Do you want to start this semester?</p>
			</Modal>
		</>
	);
};

export default ViewSemesterRegistration;
