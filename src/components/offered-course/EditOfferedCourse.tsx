import { Form } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { CoursePayload, IError } from '@/types';
import { useOfferedCourseQuery, useUpdateOfferedCourseMutation } from '@/redux/apis/offeredCourseApi';
import CourseField from '../base/common-form-field/CourseField';
import SemesterRegistrationField from '../base/common-form-field/SemesterRegistrationField';
import CoreAcademicDepartmentField from '../base/common-form-field/CoreAcademicDepartmentField';

const EditOfferedCourse = ({ id }: { id: string }) => {
	const { data, isLoading } = useOfferedCourseQuery(id);
	const [updateOfferedCourse] = useUpdateOfferedCourseMutation();
	const updateOfferedCourseOnSubmit = async (values: CoursePayload) => {
		try {
			await updateOfferedCourse({ id, body: values }).unwrap();
			notifySuccess('offered course updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		courseId: data?.courseId || '',
		semesterRegistrationId: data?.semesterRegistrationId || '',
		academicDepartmentId: data?.academicDepartmentId || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered-course', link: '/admin/offered-course' },
					{ label: 'create', link: '/admin/offered-course/create' },
				]}
			/>
			<ActionBar title="edit offered courese"></ActionBar>
			<Form onSubmit={updateOfferedCourseOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={24}>
						<div style={{ margin: '10px 0', width: '30%' }}>
							<SemesterRegistrationField name="semesterRegistrationId" label="semester registration" />
						</div>
					</Col>
					<Col span={24}>
						<div style={{ margin: '10px 0', width: '30%' }}>
							<CourseField name="courseId" label="courses" />
						</div>
					</Col>
					<Col span={24}>
						<div style={{ margin: '10px 0', width: '30%' }}>
							<CoreAcademicDepartmentField name="academicDepartmentId" label="Academic department" />
						</div>
					</Col>
				</Row>
				<PHUButton htmlType="submit">update</PHUButton>
			</Form>
		</>
	);
};

export default EditOfferedCourse;
