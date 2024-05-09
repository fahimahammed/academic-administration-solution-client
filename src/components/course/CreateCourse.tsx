import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useAddCourseMutation } from '@/redux/apis/courseApi';
import { CoursePayload, IError } from '@/types';
import { parseCourseCreatePayload } from '@/transformer/course';
import CourseMultiField from '../base/common-form-field/CourseMultiField';

const CreateCourse = () => {
	const [addCourse] = useAddCourseMutation();
	const createCourseOnSubmit = async (values: CoursePayload) => {
		// console.log(values)
		try {
			await addCourse(parseCourseCreatePayload(values)).unwrap();
			notifySuccess('course created successfully');
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
					{ label: 'course', link: '/admin/course' },
					{ label: 'create', link: '/admin/course/create' },
				]}
			/>
			<ActionBar title="create course"></ActionBar>
			<Form onSubmit={createCourseOnSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<div style={{ margin: '10px 0px' }}>
							<FormInput name="title" label="title" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FormInput name="code" label="code" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FormInput name="credits" label="credits" />
						</div>
						<div style={{ margin: '10px 0px' }}>
							<CourseMultiField name="courseIds" label="prerequisite courses" />
						</div>
					</Col>
				</Row>
				<Button htmlType="submit">add</Button>
			</Form>
		</>
	);
};

export default CreateCourse;
