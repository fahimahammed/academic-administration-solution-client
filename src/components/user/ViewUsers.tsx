import { ActionBar, BreadCrumbsComp, Drawer, SearchInput } from '@/ui';
import { IError, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY, USER_ROLE } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import Table from '@/ui/Table';
import Modal from '@/ui/Modal';
import { Button, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDeleteUserMutation, useUsersQuery } from '@/redux/apis/userApi';
import ViewAllPermissions from './ViewAllPermissions';
import { useDispatch, useSelector } from 'react-redux';
import { setDefault, setFilter, setSort, setUserId } from '@/redux/slices/userSlice';
import { RootState } from '@/redux';
import { DeleteOutlined, SafetyCertificateOutlined, ReloadOutlined } from '@ant-design/icons';
import Button from '@/ui/Button';
import { IUser } from '@/types/user';
import { SorterResult } from 'antd/es/table/interface';
import RoleFilter from './filter-options/RoleFilter';
import { formatDateTime } from '@/utils/datetime-converter';

const ViewUsers = () => {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [openPermissionDrawer, setOpenPermissionDrawer] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!userState.filterOptions.role || !!userState.sortBy || !!userState.sortOrder || !!searchTerm;
	}, [userState.filterOptions.role, userState.sortBy, userState.sortOrder, searchTerm]);

	query['limit'] = size;
	query['page'] = page;
	query['role'] = userState.filterOptions.role;
	query['sortBy'] = userState.sortBy;
	query['sortOrder'] = userState.sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useUsersQuery({ ...query });
	const [deleteUser] = useDeleteUserMutation();

	const users = data?.users;
	const meta = data?.meta;

	const deleteUserHandler = async (id: string) => {
		try {
			await deleteUser(id).unwrap();
			notifySuccess('user deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IUser> = [
		{
			title: 'Id',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Role',
			dataIndex: 'role',
			render: function (data: string) {
				return (
					<>
						{data === USER_ROLE.ADMIN ? <Tag color="green">{data}</Tag> : null}

						{data === USER_ROLE.SUPER_ADMIN ? <Tag color="cyan">{data}</Tag> : null}

						{data === USER_ROLE.STUDENT ? <Tag color="volcano">{data}</Tag> : null}

						{data === USER_ROLE.FACULTY ? <Tag color="magenta">{data}</Tag> : null}
					</>
				);
			},
		},
		{
			title: 'Password change needed',
			dataIndex: 'needsPasswordChange',
			render: function (data: boolean) {
				return <>{data ? <Tag color="green">Required</Tag> : <Tag color="red">Not required</Tag>}</>;
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
			render: function (data: IUser) {
				return (
					<>
						{data.role === 'admin' ? (
							<Tooltip title="view permissions" placement="bottom">
								<Button
									type="primary"
									style={{ marginLeft: '5px' }}
									onClick={() => {
										setOpenPermissionDrawer(true);
										dispatch(setUserId(data.id));
									}}
								>
									<SafetyCertificateOutlined />
								</Button>
							</Tooltip>
						) : (
							<Button style={{ visibility: 'hidden' }}>adf</Button>
						)}

						{data.role === 'super_admin' ? (
							''
						) : (
							<Tooltip title="delete user" placement="bottom">
								<Button
									type="primary"
									onClick={() => {
										setOpen(true);
										setUserId(data.id);
										dispatch(setUserId(data.id));
									}}
									danger
									style={{ marginLeft: '5px' }}
								>
									<DeleteOutlined />
								</Button>
							</Tooltip>
						)}
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
		dispatch(setFilter({}));
		dispatch(setSort({ sortBy: '', sortOrder: '' }));
		setSearchTerm('');
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IUser>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `super-admin`, link: `/super-admin` },
					{ label: `user`, link: `/super-admin/faculty` },
				]}
			/>

			<ActionBar title="user list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<RoleFilter />
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
				dataSource={users}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="remove user"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteUserHandler(userState.userId as string)}
			>
				<p className="my-5">Do you want to remove this user?</p>
			</Modal>

			<Drawer
				open={openPermissionDrawer}
				title="View all permissions"
				width={650}
				onClose={() => {
					setOpenPermissionDrawer(false);
					dispatch(setDefault());
				}}
			>
				<ViewAllPermissions />
			</Drawer>
		</>
	);
};

export default ViewUsers;
