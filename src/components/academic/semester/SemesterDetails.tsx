import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row, Tag } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useAcademicSemesterQuery } from '@/redux/apis/academic/semesterApi';

const SemesterDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useAcademicSemesterQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'semester', link: '/admin/academic/semester' },
					{ label: 'details', link: `/admin/academic/semester/details/${id}` },
				]}
			/>
			<ActionBar title={`view semester`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Title</span>
						<strong style={{ marginLeft: 'auto' }}>{data?.title}</strong>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							start month
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.startMonth}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>end month</span>
						<span style={{ marginLeft: 'auto' }}>{data?.endMonth}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>year</span>
						<span style={{ marginLeft: 'auto' }}>{data?.year}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Is Current Semester?</span>
						<Tag color={data?.isCurrent ? 'green' : 'red'} style={{ marginLeft: 'auto' }}>{data?.isCurrent ? 'Yes' : 'No'}</Tag>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.createdAt)}</span>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default SemesterDetails;
