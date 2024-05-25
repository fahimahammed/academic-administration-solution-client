import { NextPage } from 'next';
import { getFromLocalStorage } from '@/utils/local-storage';
import { COMMON_ROUTES, START_BASE_ROUTES, USER_ROLE, authKey } from '@/constants';
import { decodeToken } from '@/utils/jwt';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminDashboardLayout from './admin/AdminDashboardLayout';
import { StudentDashboardLayout } from './student';
import { FacultyDashboardLayout } from './faculty';
import SuperAdminDashboardLayout from './super_admin/SuperAdminDashboardLayout';

const withLayout = (PageComponent: NextPage) => {
	const WrappedComponent: NextPage = props => {
		const [userInfo, setUserInfo] = useState<Record<string, string>>({});
		const router = useRouter();
		const token = getFromLocalStorage(authKey) as string;

		useEffect(() => {
			if (token) {
				const user = decodeToken(token) as Record<string, string>;
				setUserInfo(user);
				if (user.role === USER_ROLE.SUPER_ADMIN) {
					if (!router.pathname.startsWith(START_BASE_ROUTES.SUPER_ADMIN)) {
						router.push(COMMON_ROUTES.NOT_ALLOWED);
					}
				} else if (user.role === USER_ROLE.ADMIN) {
					if (!router.pathname.startsWith(START_BASE_ROUTES.ADMIN)) {
						router.push(COMMON_ROUTES.NOT_ALLOWED);
					}
				} else if (user.role === USER_ROLE.STUDENT) {
					if (!router.pathname.startsWith(START_BASE_ROUTES.STUDENT)) {
						router.push(COMMON_ROUTES.NOT_ALLOWED);
					}
				} else if (user.role === USER_ROLE.FACULTY) {
					if (!router.pathname.startsWith(START_BASE_ROUTES.FACULTY)) {
						router.push(COMMON_ROUTES.NOT_ALLOWED);
					}
				} else {
					router.push(COMMON_ROUTES.NOT_ALLOWED);
				}
			} else {
				router.push(COMMON_ROUTES.NOT_ALLOWED);
			}
		}, [router, token]);

		return (
			<>
				{userInfo.role === USER_ROLE.SUPER_ADMIN && (
					<SuperAdminDashboardLayout>
						{/* @ts-expect-error: Suppress type error due to known issue with third-party library. */}
						<PageComponent {...props} />
					</SuperAdminDashboardLayout>
				)}

				{userInfo.role === USER_ROLE.ADMIN && (
					<AdminDashboardLayout>
						{/* @ts-expect-error: Suppress type error due to known issue with third-party library. */}
						<PageComponent {...props} />
					</AdminDashboardLayout>
				)}

				{userInfo.role === USER_ROLE.FACULTY && (
					<FacultyDashboardLayout>
						{/* @ts-expect-error: Suppress type error due to known issue with third-party library. */}
						<PageComponent {...props} />
					</FacultyDashboardLayout>
				)}

				{userInfo.role === USER_ROLE.STUDENT && (
					<StudentDashboardLayout>
						{/* @ts-expect-error: Suppress type error due to known issue with third-party library. */}
						<PageComponent {...props} />
					</StudentDashboardLayout>
				)}
			</>
		);
	};

	return WrappedComponent;
};

export default withLayout;
