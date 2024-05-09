import { FC, PropsWithChildren } from 'react';
// import { tempSuperAdminSidebar } from '@/constants';
import BaseLayout from '../BaseLayout';
import { sidebarItems } from '@/constants/sidebar';
import { USER_ROLE } from '@/constants';

const SuperAdminDashboardLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<BaseLayout sidebarData={sidebarItems(USER_ROLE.SUPER_ADMIN)}>{children}</BaseLayout>
		</>
	);
};

export default SuperAdminDashboardLayout;
