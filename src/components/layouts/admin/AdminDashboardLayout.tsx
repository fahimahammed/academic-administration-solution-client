import { FC, PropsWithChildren } from 'react';
import { USER_ROLE } from '@/constants';
import BaseLayout from '../BaseLayout';
import { sidebarItems } from '@/constants/sidebar';

const AdminDashboardLayout: FC<PropsWithChildren> = ({ children }) => (
	<>
		<BaseLayout sidebarData={sidebarItems(USER_ROLE.ADMIN)}>{children}</BaseLayout>
	</>
);

export default AdminDashboardLayout;
