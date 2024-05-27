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
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							Day of week
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.dayOfWeek}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>start time</span>
						<span style={{ marginLeft: 'auto' }}>{data?.startTime}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>end time</span>
						<span style={{ marginLeft: 'auto' }}>{data?.endTime}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							course section
						</span>
						<span style={{ marginLeft: 'auto' }}>{`${data?.offeredCourseSection?.title}`}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Course Title</span>
						<span style={{ marginLeft: 'auto' }}>{data?.offeredCourseSection?.offeredCourse?.course?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Course Code</span>
						<span style={{ marginLeft: 'auto' }}>{data?.offeredCourseSection?.offeredCourse?.course?.code}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Course Credits</span>
						<span style={{ marginLeft: 'auto' }}>{data?.offeredCourseSection?.offeredCourse?.course?.credits}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Classroom</span>
						<span style={{ marginLeft: 'auto' }}>{data?.room?.roomNumber}, {data?.room?.floor} Floor ({data?.room?.building?.title})</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Total Student</span>
						<span style={{ marginLeft: 'auto' }}>{data?.offeredCourseSection?.currentlyEnrolledStudent}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							faculty
						</span>
						<span
							style={{ marginLeft: 'auto' }}
						>{`${data?.faculty?.firstName} ${data?.faculty?.middleName} ${data?.faculty?.lastName} (${data?.faculty?.designation})`}</span>
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

export default OfferedCourseScheduleDetails;
