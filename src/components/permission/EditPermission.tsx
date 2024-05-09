import { usePermissionQuery, useUpdatePermissionMutation } from '@/redux/apis/permissionApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import React from 'react';
import { Form } from '../forms';
import Button from '@/ui/Button';
import { FormInput } from '../forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { IError } from '@/types';
import { logger } from '@/services';

function EditPermission({ id }: { id: string }) {
	const { data, isLoading } = usePermissionQuery(id);
	const [updatePermisison] = useUpdatePermissionMutation();

	const handleSubmit = async (values: { title: string }) => {
		try {
			await updatePermisison({ id, body: values }).unwrap();
			notifySuccess('permission updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValeus = {
		title: data?.title || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'super-admin', link: '/super-admin' },
					{ label: 'permission', link: '/super-admin/permission' },
					{ label: 'edit', link: `/super-admin/permission/edit/${id}` },
				]}
			/>
			<ActionBar title="edit permission"></ActionBar>
			<Form onSubmit={handleSubmit} defaultValues={defaultValeus}>
				<div style={{ margin: '5px 0' }}>
					<FormInput type="text" name="title" label="Permission title" />
				</div>
				<div>
					<Button htmlType="submit" style={{ margin: '5px 0px' }}>
						save
					</Button>
				</div>
			</Form>
		</>
	);
}

export default EditPermission;
