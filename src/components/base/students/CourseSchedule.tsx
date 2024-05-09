import { useMyCourseSchedulesQuery } from '@/redux/apis/base-admin/student/coreStudentApi';
import { IMyCourseSchedule, IOfferedCourse, IOfferedCourseSchedule, IOfferedCourseSection, QueryParamsType } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import Table from '@/ui/Table';
import { Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import AcademicSemesterFilter from './filter-options/AcademicSemesterFilter';
import { RootState } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/ui/Button';
import { setDefault } from '@/redux/slices/academic/coreSemesterSlice';
import { ReloadOutlined } from '@ant-design/icons';
import ClassSchedule from './ClassSchedule';
import CourseFilter from './filter-options/CourseFilter';

export default function CourseSchedule() {
	const query: Record<string, QueryParamsType> = {};
	const coreAcademicSemesterState = useSelector((state: RootState) => state.academicCoreSemester);

	if (!!coreAcademicSemesterState?.filterOptions?.academicSemesterId) {
		query['academicSemesterId'] = coreAcademicSemesterState?.filterOptions?.academicSemesterId;
	}

	if (!!coreAcademicSemesterState?.filterOptions?.courseId) {
		query['courseId'] = coreAcademicSemesterState?.filterOptions?.courseId;
	}

	const { data, isLoading } = useMyCourseSchedulesQuery({ ...query });
	const dispatch = useDispatch();

	const showResetFilterOption = useMemo(() => {
		return (
			!!coreAcademicSemesterState?.filterOptions?.academicSemesterId ||
			coreAcademicSemesterState?.filterOptions?.courseId
		);
	}, [coreAcademicSemesterState?.filterOptions?.academicSemesterId, coreAcademicSemesterState?.filterOptions?.courseId]);

	const columns: ColumnsType<IMyCourseSchedule> = [
		{
			title: 'Course name',
			dataIndex: 'offeredCourse',
			render: function (data: IOfferedCourse) {
				return <>{data.course.title}</>;
			},
		},
		{
			title: 'Credit',
			dataIndex: 'offeredCourse',
			render: function (data: IOfferedCourse) {
				return <>{data.course.credits}</>;
			},
		},
		{
			title: 'Section',
			dataIndex: 'offeredCourseSection',
			render: function (data: IOfferedCourseSection) {
				return <>{data.title}</>;
			},
		},
		{
			title: 'Class Schedules',
			dataIndex: 'offeredCourseSection',
			render: function (data: IOfferedCourseSection) {
				return (
					<>
						<ClassSchedule data={data.offeredCourseClassSchedules as IOfferedCourseSchedule[]} />
					</>
				);
			},
		},
	];

	const resetAllFilter = () => {
		dispatch(setDefault());
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `student`, link: `/student` },
					{ label: `courses`, link: `/student/courses` },
					{ label: `schedule`, link: `/student/courses/schedule` },
				]}
			/>

			<ActionBar title="my course schedules">
				<AcademicSemesterFilter />
				<CourseFilter />
				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<Button onClick={resetAllFilter} size="large" style={{ marginLeft: '10px' }}>
							<ReloadOutlined />
						</Button>
					</Tooltip>
				) : null}
			</ActionBar>

			<Table loading={isLoading} dataSource={data?.myCourseSchedules} columns={columns} showPagination={false} />
		</>
	);
}
