import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { IError, SemesterRegistrationPayload } from '@/types';
import { useAddSemesterRegistrationsMutation } from '@/redux/apis/semesterRegistrationApi';
import FormDatePicker from '../forms/FormDatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { SemesterRegistrationSchema } from '@/schemas';
import { parseSemesterRegistrationRequestPayload } from '@/transformer/semester-registration';
import CoreAcademicSemesterField from '../base/common-form-field/CoreAcademicSemesterField';

const CreateSemesterRegistration = () => {
	const [addSemesterRegistration] = useAddSemesterRegistrationsMutation();
	const createCourseOnSubmit = async (values: SemesterRegistrationPayload) => {
		try {
			await addSemesterRegistration(parseSemesterRegistrationRequestPayload(values)).unwrap();
			notifySuccess('semester registration created successfully');
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
					{ label: 'semester-registration', link: '/admin/semester-registration' },
					{ label: 'create', link: '/admin/semester-registration/create' },
				]}
			/>
			<ActionBar title="create semester registration"></ActionBar>
			<Form onSubmit={createCourseOnSubmit} resolver={yupResolver(SemesterRegistrationSchema)}>
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
					</Col>
				</Row>
				<Button htmlType="submit">add</Button>
			</Form>
		</>
	);
};

export default CreateSemesterRegistration;
