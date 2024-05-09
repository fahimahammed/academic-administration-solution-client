import { RootState } from '@/redux';
import { useRemovePermissionMutation, useUserAssignedPermissionQuery } from '@/redux/apis/userApi';
import { logger } from '@/services';
import { IError, IPermission, QueryParamsType } from '@/types';
import { PHUPopConfirm } from '@/ui';
import PHUTable from '@/ui/PHUTable';
import { notifyError } from '@/ui/ToastNotification';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function AssignedPermisisons() {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const userState = useSelector((state: RootState) => state.user);
	const query: Record<string, QueryParamsType> = {};

	query['limit'] = size;
	query['page'] = page;
	query['id'] = userState?.userId as string;

	const { data, isLoading } = useUserAssignedPermissionQuery(query);
	const [removePermisisons] = useRemovePermissionMutation();
	const permissions = data?.assignedPermissions;
	const meta = data?.meta;

	const handleRemovePermission = async (data: string, id: string) => {
		try {
			const reqBody = {
				permissionIds: [data],
			};
			const payload = {
				reqBody,
				id,
			};
			await removePermisisons(payload).unwrap();
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
						<PHUPopConfirm
							placement="bottom"
							title="Remove permission"
							description="want to remove this permission?"
							onText="ok"
							cancelText="cancel"
							onConfirm={() => handleRemovePermission(data.id, userState?.userId as string)}
						>
							<Button htmlType="button" type="primary" danger>
								remove
							</Button>
						</PHUPopConfirm>
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
			<PHUTable
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

export default AssignedPermisisons;
