import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useOfferedCourseSectionQuery } from '@/redux/apis/offerdCourseSectionApi';
import { OfferedCourseClassSchedulesEntity } from '@/types/offered-course-section';

const OfferedCourseSectonDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useOfferedCourseSectionQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered course section', link: '/admin/offered-course-section' },
					{ label: 'details', link: `/admin/offered-course-section/details/${id}` },
				]}
			/>
			<ActionBar title={`view offered course section`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Course</span>
						<strong style={{ marginLeft: 'auto' }}>{data?.offeredCourse?.course?.title}</strong>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Section</span>
						<span style={{ marginLeft: 'auto' }}>{data?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							max capacity
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.maxCapacity}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							currently Enrolled Student
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.currentlyEnrolledStudent}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>created at</span>
						<span style={{ marginLeft: 'auto' }}>{formatDateTime(data?.createdAt)}</span>
					</div>

					<div style={{ margin: '10px 0px' }}>
						<h1 style={{ marginBottom: '10px', marginTop: '30px' }}>Class Schedules</h1>
						{data?.offeredCourseClassSchedules.map(
							(schedule: OfferedCourseClassSchedulesEntity, index: number) => {
								return (
									<div
										key={index}
										style={{
											border: '1px solid #d9d9d9',
											padding: '10px',
											marginBottom: '5px',
											borderRadius: '5px',
										}}
									>
										<div style={{ display: 'flex', margin: '10px 0px' }}>
											<span
												style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}
											>
												day of week
											</span>
											<span style={{ marginLeft: 'auto' }}>{schedule?.dayOfWeek}</span>
										</div>
										<div style={{ display: 'flex', margin: '10px 0px' }}>
											<span
												style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}
											>
												start time
											</span>
											<span style={{ marginLeft: 'auto' }}>{schedule?.startTime}</span>
										</div>

										<div style={{ display: 'flex', margin: '10px 0px' }}>
											<span
												style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}
											>
												end time
											</span>
											<span style={{ marginLeft: 'auto' }}>{schedule?.endTime}</span>
										</div>

										<div style={{ display: 'flex', margin: '10px 0px' }}>
											<span
												style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}
											>
												room
											</span>
											<span style={{ marginLeft: 'auto' }}>{schedule?.room?.roomNumber} ({schedule.room.building.title})</span>
										</div>

										<div style={{ display: 'flex', margin: '10px 0px' }}>
											<span
												style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}
											>
												faculty name
											</span>
											<span
												style={{ marginLeft: 'auto' }}
											>{`${schedule?.faculty?.firstName} ${schedule?.faculty?.lastName}`}</span>
										</div>
									</div>
								);
							}
						)}
					</div>
				</Col>
			</Row>
		</>
	);
};

export default OfferedCourseSectonDetails;
