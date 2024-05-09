import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useOfferedCourseScheduleQuery } from '@/redux/apis/offeredCourseScheduleApi';

const OfferedCourseScheduleDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useOfferedCourseScheduleQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered course schedule', link: '/admin/offered-course-schedule' },
					{ label: 'details', link: `/admin/offered-course-schedule/details/${id}` },
				]}
			/>
			<ActionBar title={`view offered course schedule`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							Day of week
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.dayOfWeek.toLowerCase()}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>start time</span>
						<span style={{ marginLeft: 'auto' }}>{data?.startTime}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>end time</span>
						<span style={{ marginLeft: 'auto' }}>{data?.endTime}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							course section
						</span>
						<span style={{ marginLeft: 'auto' }}>{`${data?.offeredCourseSection?.title}`}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Room</span>
						<span style={{ marginLeft: 'auto' }}>{data?.room?.roomNumber}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							faculty name
						</span>
						<span
							style={{ marginLeft: 'auto' }}
						>{`${data?.faculty?.firstName} ${data?.faculty?.lastName}`}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '66%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.createdAt)}</span>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default OfferedCourseScheduleDetails;
