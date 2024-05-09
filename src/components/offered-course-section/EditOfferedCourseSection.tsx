import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { parseOfferedCourseSectionRequestPayload } from '@/transformer/offered-courese.section';
import { useOfferedCourseSectionQuery, useUpdateOfferedCourseSectionMutation } from '@/redux/apis/offerdCourseSectionApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { OfferedCourseSectionPayload } from '@/types/offered-course-section';
import OfferedCourseField from '../base/common-form-field/OfferedCourseField';
import { IError } from '@/types';

const CreateOfferedCourseSection = ({ id }: { id: string }) => {
	const [updaateOfferedCourseSection] = useUpdateOfferedCourseSectionMutation();
	const { data, isLoading } = useOfferedCourseSectionQuery(id);
	const updateOfferedCourseSectionOnSubmit = async (values: OfferedCourseSectionPayload) => {
		try {
			await updaateOfferedCourseSection({ id, body: parseOfferedCourseSectionRequestPayload(values) }).unwrap();
			notifySuccess('offered course section updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		title: data?.title,
		offeredCourseId: data?.offeredCourseId,
		maxCapacity: data?.maxCapacity,
		classSchedules: data?.offeredCourseClassSchedules,
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered course section', link: '/admin/offered-course-section' },
					{ label: 'edit', link: `/admin/offered-course-section/edit/${id}` },
				]}
			/>
			<ActionBar title="edit offered course section"></ActionBar>
			<Form onSubmit={updateOfferedCourseSectionOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8}>
						<div style={{ margin: '10px 0' }}>
							<OfferedCourseField name="offeredCourseId" label="offered course" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="title" label="title" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="maxCapacity" label="max capacity" />
						</div>
						<PHUButton htmlType="submit">update</PHUButton>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default CreateOfferedCourseSection;
