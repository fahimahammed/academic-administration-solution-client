import { PHUTab } from '@/ui';
import { TabsProps } from 'antd';
import React from 'react';
import AvailablePermissions from './AvailablePermissions';
import AssignedPermisisons from './AssignedPermisisons';

function ViewAllPermissions() {
	const permissionTabItems: TabsProps['items'] = [
		{
			key: '1',
			label: `Assigned permissions`,
			children: <AssignedPermisisons />,
		},
		{
			key: '2',
			label: `Available permissions`,
			children: <AvailablePermissions />,
		},
	];

	return (
		<>
			<PHUTab defaultActiveKey="1" items={permissionTabItems} />
		</>
	);
}

export default ViewAllPermissions;
