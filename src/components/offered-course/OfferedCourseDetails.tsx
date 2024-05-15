import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useOfferedCourseQuery } from '@/redux/apis/offeredCourseApi';

const OfferedCourseDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useOfferedCourseQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'offered-course', link: '/admin/offered-course' },
					{ label: 'details', link: `/admin/offered-course/details/${id}` },
				]}
			/>
			<ActionBar title={`view offered course`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={12} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px', width: '65%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>course</span>
						<span style={{ marginLeft: 'auto' }}>{data?.course?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '65%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							Academic Department
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.academicDepartment?.title}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '65%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							Academic Semester
						</span>
						<span style={{ marginLeft: 'auto' }}>{data?.semesterRegistration?.academicSemester?.title} ({data?.semesterRegistration?.academicSemester?.year})</span>
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

export default OfferedCourseDetails;
