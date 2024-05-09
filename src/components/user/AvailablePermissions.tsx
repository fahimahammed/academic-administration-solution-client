import { RootState } from '@/redux';
import { useAssignPermissionMutation, useUserAvailablePermissionQuery } from '@/redux/apis/userApi';
import { logger } from '@/services';
import { IError, IPermission, QueryParamsType } from '@/types';
import { PopConfirm } from '@/ui';
import Button from '@/ui/Button';
import Table from '@/ui/Table';
import { notifyError } from '@/ui/ToastNotification';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function AvailablePermisisons() {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const userState = useSelector((state: RootState) => state.user);
	const query: Record<string, QueryParamsType> = {};

	const [assignPermission] = useAssignPermissionMutation();

	query['limit'] = size;
	query['page'] = page;
	query['id'] = userState.userId as string;

	const { data, isLoading } = useUserAvailablePermissionQuery(query);
	const permissions = data?.availablePermissions;
	const meta = data?.meta;

	const handleAssignPermission = async (data: string, id: string) => {
		try {
			const reqBody = {
				permissionIds: [data],
			};
			const payload = {
				reqBody,
				id,
			};
			await assignPermission(payload).unwrap();
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
			title: 'Action',
			render: function (data: IPermission) {
				logger.log(data);
				return (
					<>
						<PopConfirm
							placement="bottom"
							title="Assign permission"
							description="want to assign this permission?"
							onText="ok"
							cancelText="cancel"
							onConfirm={() => handleAssignPermission(data.id, userState?.userId as string)}
						>
							<Button htmlType="button">assign</Button>
						</PopConfirm>
					</>
				);
			},
		},
	];

	const onPaginationChange = (page: number, size: number) => {
		setSize(size);
		setPage(page);
	};

	return (
		<>
			<Table
				loading={isLoading}
				columns={columns}
				dataSource={permissions}
				pageSize={size}
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
			/>
		</>
	);
}

export default AvailablePermisisons;
