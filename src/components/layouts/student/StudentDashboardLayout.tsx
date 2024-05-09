import { FC, PropsWithChildren } from 'react';
import { USER_ROLE } from '@/constants';
import BaseLayout from '../BaseLayout';
import { sidebarItems } from '@/constants/sidebar';

const StudentDashboardLayout: FC<PropsWithChildren> = ({ children }) => (
	<>
		<BaseLayout sidebarData={sidebarItems(USER_ROLE.STUDENT)}>{children}</BaseLayout>
	</>
);

export default StudentDashboardLayout;
