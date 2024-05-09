import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IDepartment, IError, QueryParamsType } from '@/types';
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
import { useDeleteDepartmentMutation, useDepartmentsQuery } from '@/redux/apis/departmentApi';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';

const ViewDepartment = ({ base }: { base: string }) => {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [departmentId, setDepartmentId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm || !!sortBy || !!sortOrder;
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

	const { data, isLoading } = useDepartmentsQuery({ ...query });
	const [deleteDepartment] = useDeleteDepartmentMutation();

	const departments = data?.departments;
	const meta = data?.meta;

	const deleteDepartmentHandler = async (id: string) => {
		try {
			await deleteDepartment(id).unwrap();
			notifySuccess('department deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IDepartment> = [
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
			dataIndex: 'id',
			render: function (data: string) {
				return (
					<>
						<LinkButton
							link={`/${base}/department/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/${base}/department/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setDepartmentId(data);
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
					{ label: base, link: `/${base}` },
					{ label: 'department', link: `/${base}/department` },
				]}
			/>
			<ActionBar title="department list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/super-admin/department/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create department</span>
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
				dataSource={departments}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="remove department"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteDepartmentHandler(departmentId)}
			>
				<p className="my-5">Do you want to remove this department?</p>
			</Modal>
		</>
	);
};

export default ViewDepartment;
