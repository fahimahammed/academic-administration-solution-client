import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row, Tag } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useBuildingQuery } from '@/redux/apis/buildingApi';

const BuildingDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useBuildingQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'building', link: '/admin/building' },
					{ label: 'details', link: `/admin/building/details/${id}` },
				]}
			/>
			<ActionBar title={`view building`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Title</span>
						<strong style={{ marginLeft: 'auto' }}>{data?.title}</strong>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.createdAt)}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<strong style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Rooms</strong>
						<div style={{ marginLeft: 'auto' }}>
							{data?.rooms && data?.rooms?.length && data?.rooms?.map((room: any) => (<Tag key={room.id}>{room.roomNumber}</Tag>))}
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default BuildingDetails;
