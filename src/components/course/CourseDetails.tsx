import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row, Tag } from 'antd';
import { formatDateTime } from '@/utils/datetime-converter';
import { useCourseQuery } from '@/redux/apis/courseApi';
import { IPreRequisite } from '@/types';

const CourseDetails = ({ id }: { id: string }) => {
	const { data, isLoading } = useCourseQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'course', link: '/admin/course' },
					{ label: 'details', link: `/admin/course/details/${id}` },
				]}
			/>
			<ActionBar title={`view course`}></ActionBar>

			<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Title</span>
						<strong style={{ marginLeft: 'auto' }}>{data?.title}</strong>
					</div>
					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Code</span>
						<span style={{ marginLeft: 'auto' }}>{data?.code}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>Credits</span>
						<span style={{ marginLeft: 'auto' }}>{data?.credits}</span>
					</div>

					<div style={{ display: 'flex', margin: '10px 0px', width: '100%' }}>
						<span style={{ fontWeight: 700, marginRight: '10px', textTransform: 'capitalize' }}>
							Pre-requisite courses
						</span>
						<div style={{ width: '100%' }}>
							{data?.prerequisites?.map((el: IPreRequisite, index: number) => {
								return <Tag key={index}>{el.prerequisite.title}</Tag>;
							})}
						</div>
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

export default CourseDetails;
