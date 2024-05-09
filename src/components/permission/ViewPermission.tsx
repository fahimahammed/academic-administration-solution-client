import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IError, IPermission, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { useDeletePermissionMutation, usePermissionsQuery } from '@/redux/apis/permissionApi';
import { formatDateTime } from '@/utils/datetime-converter';
import { ColumnsType } from 'antd/es/table';
import Table from '@/ui/Table';
import Modal from '@/ui/Modal';
import { Button, Tooltip } from 'antd';
import LinkButton from '@/ui/LinkButton';
import { DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import Button from '@/ui/Button';

const ViewPermissions = () => {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [permissionId, setPermissionId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm;
	}, [searchTerm]);

	query['limit'] = size;
	query['page'] = page;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = usePermissionsQuery({ ...query });
	const [deletePermission] = useDeletePermissionMutation();

	const permissions = data?.permissions;
	const meta = data?.meta;

	const deletePermissionHandler = async (id: string) => {
		try {
			await deletePermission(id);
			notifySuccess('Permission deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IPermission> = [
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
		},
		{
			title: 'Action',
			render: function (data) {
				return (
					<>
						<LinkButton
							link={`/super-admin/permission/details/${data.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>

						<LinkButton
							link={`/super-admin/permission/edit/${data.id}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setPermissionId(data.id);
							}}
							danger
							style={{ marginLeft: '5px' }}
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
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'super-admin', link: '/super-admin' },
					{ label: 'permission', link: '/super-admin/permission' },
				]}
			/>
			<ActionBar title="permission list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/super-admin/permission/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create permission</span>
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
				dataSource={permissions}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
			/>

			<Modal
				title="remove permission"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deletePermissionHandler(permissionId)}
			>
				<p className="my-5">Do you want to remove this permission?</p>
			</Modal>
		</>
	);
};

export default ViewPermissions;
