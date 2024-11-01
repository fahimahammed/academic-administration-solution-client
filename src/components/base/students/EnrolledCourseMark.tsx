import { useMyMarksQuery } from '@/redux/apis/base-admin/student/studentEnrollCourseMarkApi';
import { IMyCourse, QueryParamsType } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import PHUTable from '@/ui/PHUTable';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/router';
import React from 'react';

export default function EnrolledCourseMark() {
	const router = useRouter();
	const { academicSemesterId, courseId } = router.query;
	const query: Record<string, QueryParamsType> = {};

	if (!!academicSemesterId) {
		query['academicSemesterId'] = academicSemesterId;
	}
	if (!!courseId) {
		query['courseId'] = courseId;
	}
	const { data, isLoading } = useMyMarksQuery({ ...query });

	const columns: ColumnsType<IMyCourse> = [
		{
			title: 'Course Name',
			dataIndex: 'studentEnrolledCourse',
			render: function (data) {
				return <>{data.course.title}</>;
			},
		},
		{
			title: 'Exam type',
			dataIndex: 'examType',
			render: function (data: string) {
				return <>{data === 'FINAL' ? <Tag color="purple">{data}</Tag> : <Tag color="orange">{data}</Tag>}</>;
			},
		},
		{
			title: 'Grade',
			dataIndex: 'grade',
			render: function (data: string) {
				return <>{!data ? <>-</> : data}</>;
			},
		},
		{
			title: 'Marks',
			dataIndex: 'marks',
		},
	];

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `student`, link: `/student` },
					{ label: `courses`, link: `/student/courses` },
					{
						label: `marks`,
						link: `/student/courses/marks?academicSemesterId=${academicSemesterId}&courseId=${courseId}`,
					},
				]}
			/>

			<ActionBar title="My Courses Marks" />

			<PHUTable loading={isLoading} dataSource={data?.myMarks} columns={columns} showPagination={false} />
		</>
	);
}
