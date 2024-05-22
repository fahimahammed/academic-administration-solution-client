import type { MenuProps } from 'antd';
import {
	ProfileOutlined,
	TableOutlined,
	AppstoreOutlined,
	ScheduleOutlined,
	ThunderboltOutlined,
	CreditCardOutlined,
	FileTextOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { USER_ROLE } from './global';

export const sidebarItems = (role: string) => {
	const tempRole = role;
	const base = tempRole.replace('_', '-').toLowerCase();
	const defaultSidebarItems: MenuProps['items'] = [
		{
			label: 'Profile',
			key: 'profile',
			icon: <ProfileOutlined />,
			children: [
				{
					label: <Link href={`/${base}`}>Account Profile</Link>,
					key: `/${base}`,
				},
				{
					label: <Link href={`/${base}/change-password`}>Change Password</Link>,
					key: `/${base}/change-password`,
				},
			],
		},
	];

	const commonAdminSidebarItems: MenuProps['items'] = [
		{
			label: <Link href={`/${base}/student`}>Manage Students</Link>,
			icon: <TableOutlined />,
			key: `/${base}/student`,
		},
		{
			label: <Link href={`/${base}/faculty`}>Manage Faculty</Link>,
			icon: <TableOutlined />,
			key: `/${base}/faculty`,
		},
	];

	const paymentItem: MenuProps['items'] = [
		{
			label: <Link href={`/${base}/payment`}>Payment</Link>,
			icon: <TableOutlined />,
			key: `/${base}/payment`,
		}
	];
	const adminSidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		...commonAdminSidebarItems,
		{
			label: 'Manage academic',
			key: 'manage-academic',
			icon: <TableOutlined />,
			children: [
				{
					label: <Link href={`/${base}/academic/faculty`}>Faculties</Link>,
					key: `/${base}/academic/faculty`,
				},
				{
					label: <Link href={`/${base}/academic/department`}>Departments</Link>,
					key: `/${base}/academic/department`,
				},
				{
					label: <Link href={`/${base}/academic/semester`}>Semesters</Link>,
					key: `/${base}/academic/semester`,
				},
			],
		},
		{
			label: 'Management',
			key: 'management',
			icon: <AppstoreOutlined />,
			children: [
				// {
				// 	label: <Link href={`/${base}/department`}>Department</Link>,
				// 	key: `/${base}/department`,
				// },
				{
					label: <Link href={`/${base}/building`}>Building</Link>,
					key: `/${base}/building`,
				},
				{
					label: <Link href={`/${base}/room`}>Rooms</Link>,
					key: `/${base}/room`,
				},
				{
					label: <Link href={`/${base}/course`}>Course</Link>,
					key: `/${base}/course`,
				},
				{
					label: <Link href={`/${base}/semester-registration`}>Semester Registration</Link>,
					key: `/${base}/semester-registration`,
				},
				{
					label: <Link href={`/${base}/offered-course`}>Offered Courses</Link>,
					key: `/${base}/offered-course`,
				},
				{
					label: <Link href={`/${base}/offered-course-section`}>Course Sections</Link>,
					key: `/${base}/offered-course-section`,
				},
				{
					label: <Link href={`/${base}/offered-course-schedule`}>Course Schedules</Link>,
					key: `/${base}/offered-course-schedule`,
				},
			],
		},
		...paymentItem
	];

	const superAdminSidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		...commonAdminSidebarItems,
		{
			label: <Link href={`/${base}/admin`}>Manage Admin</Link>,
			icon: <TableOutlined />,
			key: `/${base}/admin`,
		},
		{
			label: <Link href={`/${base}/user`}>Manage User</Link>,
			icon: <TableOutlined />,
			key: `/${base}/user`,
		},
		...paymentItem
	];

	const studentSidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		{
			label: <Link href={`/${base}/courses`}>Courses</Link>,
			icon: <TableOutlined />,
			key: `/${base}/courses`,
		},
		{
			label: <Link href={`/${base}/courses/schedule`}>Course Schedules</Link>,
			icon: <ScheduleOutlined />,
			key: `/${base}/courses/schedule`,
		},
		{
			label: <Link href={`/${base}/registration`}>Registration</Link>,
			icon: <ThunderboltOutlined />,
			key: `/${base}/registration`,
		},
		{
			label: <Link href={`/${base}/payment`}>Payment</Link>,
			icon: <CreditCardOutlined />,
			key: `/${base}/payment`,
		},
		{
			label: <Link href={`/${base}/academic-report`}>Academic Report</Link>,
			icon: <FileTextOutlined />,
			key: `/${base}/academic-report`,
		},
	];

	const facultySidebarItems: MenuProps['items'] = [
		...defaultSidebarItems,
		{
			label: <Link href={`/${base}/courses`}>Courses</Link>,
			icon: <TableOutlined />,
			key: `/${base}/courses`,
		},
	];

	if (role === USER_ROLE.ADMIN) return adminSidebarItems;
	else if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
	else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
	else if (role === USER_ROLE.FACULTY) return facultySidebarItems;
	else return defaultSidebarItems;
};
