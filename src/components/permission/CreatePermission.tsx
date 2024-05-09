import { useAddPermissionMutation } from '@/redux/apis/permissionApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import React from 'react';
import { Form } from '../forms';
import PHUButton from '@/ui/PHUButton';
import { FormInput } from '../forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { IError } from '@/types';
import { logger } from '@/services';

function CreatePermission() {
	const [addPermisison] = useAddPermissionMutation();

	const handleSubmit = async (values: FormData) => {
		try {
			await addPermisison(values).unwrap();
			notifySuccess('permission added successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'super-admin', link: '/super-admin' },
					{ label: 'permission', link: '/super-admin/permission' },
					{ label: 'create', link: '/super-admin/permission/create' },
				]}
			/>
			<ActionBar title="create permission"></ActionBar>
			<Form onSubmit={handleSubmit}>
				<div style={{ margin: '5px 0' }}>
					<FormInput type="text" name="title" label="Permission title" />
				</div>
				<div>
					<PHUButton htmlType="submit" style={{ margin: '5px 0px' }}>
						add
					</PHUButton>
				</div>
			</Form>
		</>
	);
}

export default CreatePermission;
