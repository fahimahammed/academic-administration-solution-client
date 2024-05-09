import { useMySemesterRegistrationCoursesQuery } from '@/redux/apis/semesterRegistrationApi';
import { IGetMyCourseRegistration, IOfferedCourseSection } from '@/types';
import { ActionBar, Spinner } from '@/ui';
import { Empty } from 'antd';
import React from 'react';

export default function RegisteredCourses() {
	const { data, isLoading } = useMySemesterRegistrationCoursesQuery({});
	if (isLoading) return <Spinner />;

	const registeredCourses = data
		?.filter((el: IGetMyCourseRegistration) => el.isTaken === true)
		.map((el: IGetMyCourseRegistration) => {
			return {
				...el,
				offeredCourseSections: el?.offeredCourseSections?.filter(
					(section: IOfferedCourseSection) => section.isTaken === true
				),
			};
		});

	return (
		<>
			<ActionBar title="Registered courses"></ActionBar>
			{data?.studentEnrollCourses && data?.studentEnrollCourses?.length <= 0 ? (
				<div style={{ margin: '50px 0px' }}>
					<Empty description="no enrolled course found" />
				</div>
			) : (
				<>
					{/* enrolled course list this here */}
					<table
						style={{
							padding: '0px 10px',
							borderSpacing: '10px 15px',
							border: '1px solid #d9d9d9',
							borderRadius: '5px',
						}}
					>
						<tr style={{ fontWeight: 800 }}>
							<td>Course name</td>
							<td>Section</td>
							<td>Credit</td>
							<td>Class schedule</td>
						</tr>
						{registeredCourses?.map((el: IGetMyCourseRegistration, index: number) => {
							return (
								<tr key={index}>
									<td style={{ width: '20%' }}>
										<span>{el.course.title}</span>
									</td>

									<td style={{ width: '20%' }}>
										<span>{el?.offeredCourseSections?.map(el => el.title)}</span>
									</td>

									<td style={{ width: '20%' }}>
										<span>{el.course.credits}</span>
									</td>
									<td style={{ width: '20%' }}>
										{el.offeredCourseSections?.map(section => {
											return section?.offeredCourseClassSchedules?.map((schedule, index) => {
												return (
													<tr key={index}>
														<td
															style={{
																fontWeight: 700,
																textTransform: 'capitalize',
																textAlign: 'left',
															}}
														>
															{schedule.dayOfWeek}
														</td>
														<td style={{ textAlign: 'right', padding: '0px 15px' }}>
															{schedule.startTime} - {schedule.endTime}{' '}
														</td>
													</tr>
												);
											});
										})}
									</td>
								</tr>
							);
						})}
					</table>
				</>
			)}
		</>
	);
}
