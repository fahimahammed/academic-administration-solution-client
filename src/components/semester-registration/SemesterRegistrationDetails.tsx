import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row, Tag } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useSemesterRegistrationQuery } from '@/redux/apis/semesterRegistrationApi';

const SemesterRegistrationDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useSemesterRegistrationQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'semester-registration', link: '/admin/semester-registration' },
					{ label: 'details', link: `/admin/semester-registration/details/${id}` },
				]}
			/>
			<ActionBar title={`View Semester Registration`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Start date</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.startDate)}</span>
					</div>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>end date</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.endDate)}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							academic semester
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.academicSemester?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>max Credit</span>
						<span style={{ marginLeft: 'auto' }}>{data?.maxCredit}</span>
					</div>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Min Credit</span>
						<span style={{ marginLeft: 'auto' }}>{data?.minCredit}</span>
					</div>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.createdAt)}</span>
					</div>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Updated at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.updatedAt)}</span>
					</div>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>status</span>
						<Tag style={{ marginLeft: 'auto' }}>{data?.status}</Tag>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default SemesterRegistrationDetails;
