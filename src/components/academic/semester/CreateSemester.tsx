import { Form, FormInput, FormPicker, FormSelectField } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { monthOptions } from '@/constants';
import { useAddAcademicSemesterMutation } from '@/redux/apis/academic/semesterApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { IAcademicSemesterPayload } from '@/types/academic/semester';
import { parsedSemesterRequestPayload } from '@/transformer/academic/semester';
import { IError } from '@/types';

const CreateSemester = () => {
	const [addAcademicSemester] = useAddAcademicSemesterMutation();
	const adminOnSubmit = async (values: IAcademicSemesterPayload) => {
		try {
			const parsedRequestBody = parsedSemesterRequestPayload(values);
			await addAcademicSemester(parsedRequestBody).unwrap();
			notifySuccess('Academic semester created successfully');
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
					{ label: 'academic', link: '' },
					{ label: 'semester', link: '/admin/academic/semester/' },
					{ label: 'create', link: '/admin/academic/semester/create' },
				]}
			/>
			<ActionBar title="create academic semester"></ActionBar>
			<Form onSubmit={adminOnSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="title" label="title" />
						</div>

						<div style={{ margin: '10px 0' }}>
							<FormInput name="code" label="code" />
						</div>

						<div style={{ margin: '10px 0' }}>
							<FormSelectField name="startMonth" options={monthOptions} label="start month" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormSelectField name="endMonth" options={monthOptions} label="end month" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormPicker name="year" picker="year" />
						</div>
					</Col>
				</Row>
				<Button htmlType="submit">submit</Button>
			</Form>
		</>
	);
};

export default CreateSemester;
