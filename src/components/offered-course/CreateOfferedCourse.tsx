import { Form } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { CoursePayload, IError } from '@/types';
import { useAddOfferedCourseMutation } from '@/redux/apis/offeredCourseApi';
import SemesterRegistrationField from '../base/common-form-field/SemesterRegistrationField';
import CourseMultiField from '../base/common-form-field/CourseMultiField';
import CoreAcademicDepartmentField from '../base/common-form-field/CoreAcademicDepartmentField';

const CreateOfferedCourse = () => {
	const [addOfferedCourse] = useAddOfferedCourseMutation();
	const createOfferedCourseOnSubmit = async (values: CoursePayload) => {
		try {
			await addOfferedCourse(values).unwrap();
			notifySuccess('offered course created successfully');
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
					{ label: 'admin', link: '/admin' },
					{ label: 'offered-course', link: '/admin/offered-course' },
					{ label: 'create', link: '/admin/offered-course/create' },
				]}
			/>
			<ActionBar title="create offered course"></ActionBar>
			<Form onSubmit={createOfferedCourseOnSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={24}>
						<div style={{ margin: '10px 0', width: '30%' }}>
							<SemesterRegistrationField name="semesterRegistrationId" label="semester registration" />
						</div>
					</Col>
					<Col span={24}>
						<div style={{ margin: '10px 0', width: '30%' }}>
							<CourseMultiField name="courseIds" label="courses" />
						</div>
					</Col>
					<Col span={24}>
						<div style={{ margin: '10px 0', width: '30%' }}>
							<CoreAcademicDepartmentField name="academicDepartmentId" label="Academic department" />
						</div>
					</Col>
				</Row>
				<Button htmlType="submit">add</Button>
			</Form>
		</>
	);
};

export default CreateOfferedCourse;
