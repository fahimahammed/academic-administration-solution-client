import { FC, PropsWithChildren } from 'react';
import { USER_ROLE } from '@/constants';
import BaseLayout from '../BaseLayout';
import { sidebarItems } from '@/constants/sidebar';

const FacultyDashboardLayout: FC<PropsWithChildren> = ({ children }) => (
	<>
		<BaseLayout sidebarData={sidebarItems(USER_ROLE.FACULTY)}>{children}</BaseLayout>
	</>
);

export default FacultyDashboardLayout;
