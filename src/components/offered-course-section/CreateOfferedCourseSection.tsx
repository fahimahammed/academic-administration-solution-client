import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import CourseScheduleFields from './CourseScheduleFields';
import { parseOfferedCourseSectionRequestPayload } from '@/transformer/offered-courese.section';
import { useAddOfferedCourseSectionMutation } from '@/redux/apis/offerdCourseSectionApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { OfferedCourseSectionPayload } from '@/types/offered-course-section';
import OfferedCourseField from '../base/common-form-field/OfferedCourseField';
import CoreAcademicDepartmentField from '../base/common-field/CoreAcademicDepartmantField';
import { useDispatch, useSelector } from 'react-redux';
import { setAcademicDepartmentId } from '@/redux/slices/academic/coreDepartmentSlice';
import SemesterRegistrationField from '../base/common-field/SemesterRegistrationField';
import { setSemesterRegistrationId } from '@/redux/slices/semesterRegistrationSlice';
import { RootState } from '@/redux';
import { IError, QueryParamsType } from '@/types';

const CreateOfferedCourseSection = () => {
	const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();

	const semesterRegistrationState = useSelector((state: RootState) => state.semesterRegistration);

	const academicCoreDepartmentState = useSelector((state: RootState) => state.academicCoreDepartment);

	const dispatch = useDispatch();
	const createOfferedCourseOnSubmit = async (values: OfferedCourseSectionPayload) => {
		try {
			await addOfferedCourseSection(parseOfferedCourseSectionRequestPayload(values)).unwrap();
			notifySuccess('offered course created successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const defaultValues = {
		classSchedules: [
			{
				dayOfWeek: '',
				startTime: '',
				endTime: '',
				roomId: '',
				facultyId: '',
			},
		],
	};

	const query: Record<string, QueryParamsType> = {};

	if (!!academicCoreDepartmentState.academicDepartmentId) {
		query['academicDepartmentId'] = academicCoreDepartmentState.academicDepartmentId;
	}
	if (!!semesterRegistrationState.semesterRegistrationId) {
		query['semesterRegistrationId'] = semesterRegistrationState.semesterRegistrationId;
	}

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered course section', link: '/admin/offered-course-section' },
					{ label: 'create', link: '/admin/offered-course-section/create' },
				]}
			/>
			<ActionBar title="create course section"></ActionBar>
			<Form onSubmit={createOfferedCourseOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={9}>
						<div style={{ margin: '10px 0' }}>
							<SemesterRegistrationField
								onChange={(el: string) => {
									dispatch(setSemesterRegistrationId(el));
								}}
								placeholder="select semester registration"
								label="semester registration"
							/>
						</div>
						<div style={{ margin: '10px 0' }}>
							<CoreAcademicDepartmentField
								onChange={(el: string) => {
									dispatch(setAcademicDepartmentId(el));
								}}
								label="academic department"
								placeholder="select academic department"
							/>
						</div>
						<div style={{ margin: '10px 0', display: Object.keys(query).length === 0 ? 'none' : 'block' }}>
							<OfferedCourseField name="offeredCourseId" label="offered course" query={query} />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormInput type="text" name="title" label="title" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormInput type="number" name="maxCapacity" label="max capacity" />
						</div>
						<Button htmlType="submit">add</Button>
					</Col>
					<Col span={15}>
						<h3 style={{ margin: '0px 20px', textTransform: 'capitalize' }}>course schedules </h3>
						<div style={{ padding: '20px' }}>
							<CourseScheduleFields />
						</div>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default CreateOfferedCourseSection;
