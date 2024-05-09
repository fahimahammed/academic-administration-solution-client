import { Form, FormSelectField, FormTimePicker } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { OfferedCourseSectionPayload } from '@/types/offered-course-section';
import { dayOptions } from '@/constants';
import { useAddOfferedCourseScheduleMutation } from '@/redux/apis/offeredCourseScheduleApi';
import OfferedCourseSectionField from './OfferedCourseSectionField';
import RoomField from '../base/common-form-field/RoomField';
import FacultyField from '../base/common-form-field/FacultyField';
import { IError } from '@/types';

const CreateOfferedCourseSchedule = () => {
	const [addOfferedCourseSchedule] = useAddOfferedCourseScheduleMutation();
	const createOfferedCourseOnSubmit = async (values: OfferedCourseSectionPayload) => {
		try {
			await addOfferedCourseSchedule(values).unwrap();
			notifySuccess('course schedule created successfully');
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
					{ label: 'offered course schedule', link: '/admin/offered-course-schedule' },
					{ label: 'create', link: '/admin/offered-course-schedule/create' },
				]}
			/>
			<ActionBar title="create offered course schedule"></ActionBar>
			<Form onSubmit={createOfferedCourseOnSubmit}>
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
				<PHUButton htmlType="submit">add</PHUButton>
			</Form>
		</>
	);
};

export default CreateOfferedCourseSchedule;
