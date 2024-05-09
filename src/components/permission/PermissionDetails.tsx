import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { usePermissionQuery } from '@/redux/apis/permissionApi';

const PermissionDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = usePermissionQuery(id);

	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'super-admin', link: '/super-admin' },
					{ label: 'permission', link: '/super-admin/permission' },
					{ label: 'details', link: `/super-admin/permission/details/${id}` },
				]}
			/>
			<ActionBar title={`view permission`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '5px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>title</span>
						<span>{data?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '5px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span>{formatDateTime(data?.createdAt)}</span>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default PermissionDetails;
