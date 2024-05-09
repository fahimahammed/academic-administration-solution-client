import {
	useConfirmMyRegistrationMutation,
	useEnrollIntoCourseMutation,
	useMySemesterRegistrationCoursesQuery,
	useWithdrawFromCourseMutation,
} from '@/redux/apis/semesterRegistrationApi';
import { logger } from '@/services';
import { IError, IGetMyCourseRegistration, IOfferedCourseSchedule, IOfferedCourseSection, ItemProps } from '@/types';
import PHUCollapse from '@/ui/PHUCollapse';
import { Button, Empty } from 'antd';
import React, { useState } from 'react';
import { blue } from '@ant-design/colors';
import { ActionBar } from '@/ui';
import PHUModal from '@/ui/PHUModal';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { useRouter } from 'next/router';

type EnrollStudentFormData = {
	offeredCourseId: string;
	offeredCourseSectionId: string;
};

export default function StudentPreRegistration() {
	const router = useRouter();
	const { data, isLoading } = useMySemesterRegistrationCoursesQuery({});
	const [withdrawFromCourse] = useWithdrawFromCourseMutation();
	const [enrollIntoCourse] = useEnrollIntoCourseMutation();
	const [open, setOpen] = useState<boolean>(false);
	const [confirmMyRegistration] = useConfirmMyRegistrationMutation();

	if (isLoading) return null;

	const onSubmitEnrollCourse = async ({ offeredCourseId, offeredCourseSectionId }: EnrollStudentFormData) => {
		try {
			const response = await enrollIntoCourse({
				offeredCourseId,
				offeredCourseSectionId,
			}).unwrap();
			logger.log(response);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const onSubmitWithdrawCourse = async ({ offeredCourseId, offeredCourseSectionId }: EnrollStudentFormData) => {
		try {
			const response = await withdrawFromCourse({
				offeredCourseId,
				offeredCourseSectionId,
			}).unwrap();
			logger.log(response);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const onSubmitConfirmCourses = async () => {
		try {
			const res = await confirmMyRegistration({}).unwrap();
			logger.log(res);
			notifySuccess('registration confirmed');
			router.push('/student/registration');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const availableCourses: ItemProps[] = data.map((availableCourse: IGetMyCourseRegistration, index: number) => {
		const obj = {
			key: index,
			label: availableCourse.course.title,
			isTaken: availableCourse.isTaken,
			children: (
				<table style={{ padding: '0px 10px', borderSpacing: '10px 15px' }}>
					{availableCourse?.offeredCourseSections && availableCourse?.offeredCourseSections?.length > 0 ? (
						availableCourse?.offeredCourseSections?.map((section: IOfferedCourseSection, index: number) => {
							return (
								<tr key={index}>
									<td style={{ width: '30%' }}>
										<span style={{ fontWeight: 'bold' }}>Sec - {section.title}</span>
									</td>
									<td style={{ width: '30%' }}>
										<span>
											Enrolled - ({section.currentlyEnrolledStudent}/{section.maxCapacity})
										</span>
									</td>

									<td style={{ width: '30%' }}>
										<table
											style={{ border: '1px solid #d9d9d9', padding: '5px 10px', borderRadius: '5px' }}
										>
											<th
												style={{
													textAlign: 'center',
													borderBottom: '1px solid black',
													textTransform: 'capitalize',
												}}
												colSpan={3}
											>
												class schedule
											</th>

											{section?.offeredCourseClassSchedules?.map(
												(el: IOfferedCourseSchedule, index: number) => {
													return (
														<tr key={index}>
															<td
																style={{
																	fontWeight: 700,
																	marginRight: '10px',
																	textTransform: 'capitalize',
																	textAlign: 'right',
																}}
															>
																{el.dayOfWeek}
															</td>
															<td style={{ textAlign: 'left', padding: '0px 15px' }}>
																{el.startTime} - {el.endTime}{' '}
															</td>
														</tr>
													);
												}
											)}
										</table>
									</td>
									<td style={{ width: '30%' }}>
										<span style={{ margin: '0px 10px' }}>
											{availableCourse.isTaken && section.isTaken ? (
												<Button
													type="primary"
													danger
													onClick={() => {
														onSubmitWithdrawCourse({
															offeredCourseId: availableCourse.id,
															offeredCourseSectionId: section.id,
														});
													}}
												>
													{' '}
													withdraw
												</Button>
											) : (
												<Button
													style={{ background: blue[6], color: 'white' }}
													onClick={() => {
														onSubmitEnrollCourse({
															offeredCourseId: availableCourse.id,
															offeredCourseSectionId: section.id,
														});
													}}
												>
													{' '}
													enroll
												</Button>
											)}
										</span>
									</td>
								</tr>
							);
						})
					) : (
						<>
							<div style={{ textAlign: 'center', verticalAlign: 'middle', display: 'block' }}>
								<td>
									<Empty description="No course schedule added yet" />
								</td>
							</div>
						</>
					)}
				</table>
			),
		};
		return obj;
	});

	const isAtleastOneCourseTaken =
		availableCourses.filter((el: ItemProps) => el.isTaken === true).length > 0 ? true : false;

	return (
		<>
			<ActionBar title="Course pre-registration" />
			{availableCourses.length <= 0 && (
				<div style={{ margin: '20px 0px' }}>
					<Empty description="no course found" />
				</div>
			)}
			<PHUCollapse items={availableCourses} defaultActiveKey={availableCourses.map(item => item.key)} />

			{isAtleastOneCourseTaken && (
				<div style={{ margin: '10px 0px' }}>
					<Button
						style={{ background: blue.primary, color: 'white', textTransform: 'capitalize' }}
						onClick={() => setOpen(true)}
					>
						confirm registration
					</Button>
				</div>
			)}

			<PHUModal
				title="Confirm registration"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={onSubmitConfirmCourses}
			>
				<p className="my-5">
					<b>Warning:</b> After confirming the registration you will not be able to change any courses. So be
					careful about your changes
				</p>
			</PHUModal>
		</>
	);
}
