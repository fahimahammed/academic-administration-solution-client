import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useAcademicDepartmentQuery } from '@/redux/apis/academic/departmentApi';

const DepartmentDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useAcademicDepartmentQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'department', link: '/admin/academic/department' },
					{ label: 'details', link: `/admin/academic/department/details/${id}` },
				]}
			/>
			<ActionBar title={`view academic department`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Title</span>
						<strong style={{ marginLeft: 'auto' }}>{data?.title}</strong>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							Academic faculty
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.academicFaculty?.title}</span>
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

export default DepartmentDetails;
