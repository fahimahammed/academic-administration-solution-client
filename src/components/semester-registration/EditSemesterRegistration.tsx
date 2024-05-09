import { Form, FormInput, FormSelectField } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { IError, SemesterRegistrationPayload } from '@/types';
import { useSemesterRegistrationQuery, useUpdateSemesterRegistrationsMutation } from '@/redux/apis/semesterRegistrationApi';
import FormDatePicker from '../forms/FormDatePicker';
import { parseSemesterRegistrationRequestPayload } from '@/transformer/semester-registration';
import { semesterRegistrationStatus } from '@/constants';
import CoreAcademicSemesterField from '../base/common-form-field/CoreAcademicSemesterField';

const EditSemesterRegistration = ({ id }: { id: string }) => {
	const { data: semesterRegistration, isLoading: isSemesterRegistrationLoading } = useSemesterRegistrationQuery(id);
	const [updateSemesterRegistration] = useUpdateSemesterRegistrationsMutation();

	if (isSemesterRegistrationLoading) return <Spinner />;

	const updateSemesterRegistrationOnSubmit = async (values: SemesterRegistrationPayload) => {
		try {
			await updateSemesterRegistration({ id, body: parseSemesterRegistrationRequestPayload(values) }).unwrap();
			notifySuccess('semester registration edit successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const semesterRegistrationStatusOptions = semesterRegistrationStatus
		?.map(status => {
			return {
				label: status.toLowerCase(),
				value: status,
				disabled: false,
			};
		})
		.map(el => {
			if (semesterRegistration?.status === 'UPCOMING') {
				if (el.value === 'ENDED') {
					el.disabled = true;
				}
			} else if (semesterRegistration?.status === 'ONGOING') {
				if (el.value === 'UPCOMING') {
					el.disabled = true;
				}
			}
			return el;
		});

	const defaultValues = {
		startDate: semesterRegistration?.startDate || '',
		endDate: semesterRegistration?.endDate || '',
		academicSemesterId: semesterRegistration?.academicSemester?.id || '',
		minCredit: semesterRegistration?.minCredit || '',
		maxCredit: semesterRegistration?.maxCredit || '',
		status: semesterRegistration?.status || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'semester-registration', link: '/admin/semester-registration' },
					{ label: 'edit', link: `/admin/semester-registration/edit/${id}` },
				]}
			/>
			<ActionBar title="edit semester registration"></ActionBar>
			<Form onSubmit={updateSemesterRegistrationOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<div style={{ margin: '10px 0px' }}>
							<FormDatePicker name="startDate" label="start date" />
						</div>
						<div style={{ margin: '10px 0px' }}>
							<FormDatePicker name="endDate" label="end date" />
						</div>
						<div style={{ margin: '10px 0px' }}>
							<CoreAcademicSemesterField name="academicSemesterId" label="Academic semester" />
						</div>
						<div style={{ margin: '10px 0px' }}>
							<FormInput type="number" name="minCredit" label="min credit" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FormInput type="number" name="maxCredit" label="max credit" />
						</div>

						<div style={{ margin: '10px 0px' }}>
							<FormSelectField options={semesterRegistrationStatusOptions} name="status" label="status" />
						</div>
					</Col>
				</Row>
				<PHUButton htmlType="submit">update</PHUButton>
			</Form>
		</>
	);
};

export default EditSemesterRegistration;
