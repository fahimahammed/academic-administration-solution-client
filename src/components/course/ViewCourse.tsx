import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { ICourse, IDepartment, IError, QueryParamsType } from '@/types';
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
import { DeleteOutlined, EditOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import Button from '@/ui/Button';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useCoursesQuery, useDeleteCourseMutation } from '@/redux/apis/courseApi';

const ViewCourse = () => {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [courseId, setCourseId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm || !!sortBy || !!sortOrder;
	}, [searchTerm, sortBy, sortOrder]);

	query['limit'] = size;
	query['page'] = page;
	if (!!sortBy) query['sortBy'] = sortBy;
	if (!!sortOrder) query['sortOrder'] = sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useCoursesQuery({ ...query });
	const [deleteCourse] = useDeleteCourseMutation();

	const courses = data?.courses;
	const meta = data?.meta;

	const deleteCourseHandler = async (id: string) => {
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

	const columns: ColumnsType<ICourse> = [
		{
			title: 'Title',
			dataIndex: 'title',
			sorter: true,
		},
		{
			title: 'Code',
			dataIndex: 'code',
			sorter: true,
		},
		{
			title: 'Credits',
			dataIndex: 'credits',
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
							link={`/admin/course/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/course/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setCourseId(data);
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

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IDepartment>) => {
		const { order, field } = sorter;
		setSortBy(field as string);
		setSortOrder(order === 'ascend' ? 'asc' : 'desc');
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'course', link: '/admin/course' },
				]}
			/>
			<ActionBar title="course list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/admin/course/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create course</span>
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
				dataSource={courses}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="remove course"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteCourseHandler(courseId)}
			>
				<p className="my-5">Do you want to remove this course?</p>
			</Modal>
		</>
	);
};

export default ViewCourse;
