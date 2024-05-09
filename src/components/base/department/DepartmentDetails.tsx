import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { useDepartmentQuery } from '@/redux/apis/departmentApi';
import { formatDateTime } from '@/utils/datetime-converter';

type DepartmentDetailsProps = {
	id: string;
	base: string;
};
const DepartmentDetails = ({ id, base }: DepartmentDetailsProps) => {
	const { data, isLoading } = useDepartmentQuery(id);

	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'department', link: `/${base}/department` },
					{ label: 'details', link: `/${base}/department/details/${id}` },
				]}
			/>
			<ActionBar title={`view management department`}></ActionBar>

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

export default DepartmentDetails;
