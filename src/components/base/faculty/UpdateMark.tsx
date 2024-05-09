import { Form, FormInput } from '@/components/forms';
import { useUpdateMarksMutation } from '@/redux/apis/base-admin/student/studentEnrollCourseMarkApi';
import { logger } from '@/services';
import { updateStudentMarkRequestPayload } from '@/transformer/faculty';
import { IError, UpdateMarkPayload } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { useRouter } from 'next/router';
import React from 'react';

export default function UpdateMark() {
	const router = useRouter();
	const { courseId, academicSemesterId, studentId, marks, examType, offeredCourseSectionId } = router.query;
	const [updateMarks] = useUpdateMarksMutation();
	const defaultValues = {
		marks,
		courseId,
		academicSemesterId,
		studentId,
		examType,
	};

	const onSubmit = async (values: UpdateMarkPayload) => {
		try {
			await updateMarks(updateStudentMarkRequestPayload(values)).unwrap();
			notifySuccess('mark updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};
	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'faculty', link: '/faculty' },
					{ label: 'courses', link: '/faculty/courses' },
					{
						label: 'students',
						link: `/faculty/courses/student?courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}&academicSemesterId=${academicSemesterId}`,
					},
					{
						label: 'result',
						link: `/faculty/student-result?studentId=${studentId}&academicSemesterId=${academicSemesterId}&courseId=${courseId}`,
					},
				]}
			/>
			<ActionBar title="update mark"></ActionBar>
			<Form defaultValues={defaultValues} onSubmit={onSubmit}>
				<div style={{ margin: '10px 0px' }}>Exam type: {examType}</div>
				<FormInput name="marks" label="marks" />
				<PHUButton htmlType="submit">update</PHUButton>
			</Form>
		</>
	);
}
