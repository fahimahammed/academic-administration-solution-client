import { Form, FormSelectField, FormTimePicker } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { OfferedCourseSectionPayload } from '@/types/offered-course-section';
import {
	useOfferedCourseScheduleQuery,
	useUpdateOfferedCourseScheduleMutation,
} from '@/redux/apis/offeredCourseScheduleApi';
import { dayOptions } from '@/constants';
import OfferedCourseSectionField from './OfferedCourseSectionField';
import RoomField from '../base/common-form-field/RoomField';
import FacultyField from '../base/common-form-field/FacultyField';
import { IError } from '@/types';

const EditOfferedCourseSchedule = ({ id }: { id: string }) => {
	const [updaateOfferedCourseSchedule] = useUpdateOfferedCourseScheduleMutation();
	const { data, isLoading } = useOfferedCourseScheduleQuery(id);
	const updateOfferedCourseScheduleOnSubmit = async (values: OfferedCourseSectionPayload) => {
		try {
			await updaateOfferedCourseSchedule({ id, body: values }).unwrap();
			notifySuccess('course schedule updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		dayOfWeek: data?.dayOfWeek || '',
		startTime: data?.startTime || '',
		endTime: data?.endTime || '',
		roomId: data?.roomId || '',
		facultyId: data?.facultyId || '',
		offeredCourseSectionId: data?.offeredCourseSectionId || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered course schedule', link: '/admin/offered-course-schedule' },
					{ label: 'edit', link: `/admin/offered-course-schedule/edit/${id}` },
				]}
			/>
			<ActionBar title="edit offered course section"></ActionBar>
			<Form onSubmit={updateOfferedCourseScheduleOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8}>
						<div style={{ margin: '10px 0px' }}>
							<FormSelectField options={dayOptions} name={`dayOfWeek`} label="day of week" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FormTimePicker name={`startTime`} label="start time" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FormTimePicker name={`endTime`} label="end time" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<RoomField name={`roomId`} label="room" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FacultyField name={`facultyId`} label="faculty" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<OfferedCourseSectionField name="offeredCourseSectionId" label="course section" />
						</div>
					</Col>
				</Row>
				<PHUButton htmlType="submit">update</PHUButton>
			</Form>
		</>
	);
};

export default EditOfferedCourseSchedule;
