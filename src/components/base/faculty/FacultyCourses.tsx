import { ICourse, IFacultyCourse, IOfferedCourseSchedule, IOfferedCourseSection, QueryParamsType } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import PHUTable from '@/ui/PHUTable';
import { Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import { RootState } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import PHUButton from '@/ui/PHUButton';
import { setDefault } from '@/redux/slices/academic/coreSemesterSlice';
import { ReloadOutlined } from '@ant-design/icons';
import AcademicSemesterFilter from '../students/filter-options/AcademicSemesterFilter';
import { useFacultyCoursesQuery } from '@/redux/apis/base-admin/faculty/coreFacultyApi';
import { useRouter } from 'next/router';

export default function FacultyCourses() {
	const router = useRouter();
	const query: Record<string, QueryParamsType> = {};
	const coreAcademicSemesterState = useSelector((state: RootState) => state.academicCoreSemester);

	if (!!coreAcademicSemesterState?.filterOptions?.academicSemesterId) {
		query['academicSemesterId'] = coreAcademicSemesterState?.filterOptions?.academicSemesterId;
	}

	const { data, isLoading } = useFacultyCoursesQuery({ ...query });
	const dispatch = useDispatch();

	const showResetFilterOption = useMemo(() => {
		return !!coreAcademicSemesterState?.filterOptions?.academicSemesterId;
	}, [coreAcademicSemesterState?.filterOptions?.academicSemesterId]);

	const columns: ColumnsType<IFacultyCourse> = [
		{
			title: 'Course name',
			dataIndex: 'course',
			render: function (data: ICourse) {
				return <>{data.title}</>;
			},
		},
		{
			title: 'Code',
			dataIndex: 'course',
			render: function (data: ICourse) {
				return <>{data.code}</>;
			},
		},
		{
			title: 'Credit',
			dataIndex: 'course',
			render: function (data: ICourse) {
				return <>{data.credits}</>;
			},
		},
		{
			title: 'Section',
			dataIndex: 'sections',
			render: function (
				data: {
					classSchedules: IOfferedCourseSchedule[];
					section: IOfferedCourseSection;
				}[]
			) {
				const section = data.map(el => el.section);
				return (
					<>
						{section.map((el, index) => {
							return (
								<div key={index} style={{ margin: '20px 0px' }}>
									<span>
										Sec - {el.title} ({el.currentlyEnrolledStudent}/{el.maxCapacity})
									</span>
								</div>
							);
						})}
					</>
				);
			},
		},
		{
			title: 'Action',
			render: function (data: IFacultyCourse) {
				const section: IOfferedCourseSection[] | undefined = data?.sections?.map(el => el.section);
				return (
					<>
						{section?.map((el: IOfferedCourseSection, index: number) => {
							return (
								<div key={index} style={{ margin: '20px 0px' }}>
									{coreAcademicSemesterState?.filterOptions?.academicSemesterId ? (
										<PHUButton
											onClick={() => {
												router.push(
													`/faculty/courses/student?courseId=${data?.course?.id}&offeredCourseSectionId=${el.id}&academicSemesterId=${coreAcademicSemesterState?.filterOptions?.academicSemesterId}`
												);
											}}
										>
											View all Students
										</PHUButton>
									) : null}
								</div>
							);
						})}
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
					{ label: `faculty`, link: `/faculty` },
					{ label: `courses`, link: `/faculty/courses` },
				]}
			/>

			<ActionBar title="My courses">
				<AcademicSemesterFilter />
				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<PHUButton onClick={resetAllFilter} size="large" style={{ marginLeft: '10px' }}>
							<ReloadOutlined />
						</PHUButton>
					</Tooltip>
				) : null}
			</ActionBar>

			<PHUTable loading={isLoading} dataSource={data?.myCourses} columns={columns} showPagination={false} />
		</>
	);
}
