import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useAcademicFacultyQuery } from '@/redux/apis/academic/facultyApi';

const FacultyDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useAcademicFacultyQuery(id);

	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'faculty', link: '/admin/academic/faculty' },
					{ label: 'details', link: `/admin/academic/faculty/details/${id}` },
				]}
			/>
			<ActionBar title={`view faculty`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px', width: '65%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Title</span>
						<span style={{ marginLeft: 'auto' }}>{data?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '65%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.createdAt)}</span>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default FacultyDetails;
