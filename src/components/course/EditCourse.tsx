import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useCourseQuery, useUpdateCourseMutation } from '@/redux/apis/courseApi';
import { CoursePayload, IError } from '@/types';
import { parseCourseCreatePayload } from '@/transformer/course';
import PreRequisiteCourses from './PreRequisiteCourses';

const EditCourse = ({ id }: { id: string }) => {
	const { data, isLoading } = useCourseQuery(id);
	const [updateCourse] = useUpdateCourseMutation();
	const updateCourseOnSubmit = async (values: CoursePayload) => {
		try {
			await updateCourse({ id, body: parseCourseCreatePayload(values) }).unwrap();
			notifySuccess('course updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		title: data?.title || '',
		code: data?.code || '',
		credits: data?.credits || '',
		prerequisites: data?.prerequisites,
		coursePreRequisites: [],
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'course', link: '/admin/course' },
					{ label: 'edit', link: `/admin/course/edit/${id}` },
				]}
			/>
			<ActionBar title="edit course"></ActionBar>
			<Form onSubmit={updateCourseOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput name="title" label="title" />
						<FormInput name="code" label="code" />
						<FormInput name="credits" label="credits" />
						<div style={{ margin: '10px 0px' }}>
							<PHUButton htmlType="submit">update</PHUButton>
						</div>
					</Col>

					<Col span={16} style={{ margin: '10px 0' }}>
						<PreRequisiteCourses prerequisites={data?.prerequisites} />
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default EditCourse;
