import { useMyAcademicInfosQuery } from '@/redux/apis/base-admin/student/coreStudentApi';
import { CompletedCoursesEntity, IMyCourseSchedule, QueryParamsType } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import PHUTable from '@/ui/PHUTable';
import { Card, Col, Row, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export default function AcademicReport() {
	const query: Record<string, QueryParamsType> = {};
	const { data, isLoading } = useMyAcademicInfosQuery({ ...query });
	const columns: ColumnsType<IMyCourseSchedule> = [
		{
			title: 'Grade Report',
			dataIndex: '',
			render: function (data) {
				return (
					<>
						<div style={{ marginBottom: '15px' }}>
							<div style={{ textAlign: 'center', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '10px' }}>
								<h3>
									{data?.academicSemester?.title} - {data?.academicSemester?.year}
								</h3>{' '}
								{data?.academicSemester?.isCurrent === true && <>

									<Tag color="blue">
										<b>ONGOING</b>
									</Tag>
								</>}

							</div>
							<ul style={{ listStyle: 'none', marginTop: '20px' }}>
								{data?.completedCourses?.map((el: CompletedCoursesEntity) => {
									return (
										<li key={el.id}>
											<div
												style={{
													border: '1px solid #d9d9d9',
													borderRadius: '5px',
													marginBottom: '5px',
													padding: '10px',
												}}
											>
												<b>{el?.course?.title}</b>
												<div>
													<span>
														Grade: <b>{el?.grade}</b>
													</span>
													<span style={{ marginLeft: '20px' }}>
														GPA: <b>{el?.point}</b>
													</span>
													<span style={{ marginLeft: '20px' }}>
														Status: <Tag color={`${el?.status === "COMPLETED" ? "green" : "red"}`}><b>{el?.status}</b></Tag>
													</span>
													<span style={{ marginLeft: '20px' }}>
														Marks: <b>{el?.totalMarks}</b>
													</span>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</>
				);
			},
		},
	];

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `student`, link: `/student` },
					{ label: `academic-report`, link: `/student/academic-report` },
				]}
			/>

			<ActionBar title="My Academic grade report" />

			<Row gutter={24}>
				<Col span={12}>
					<Card title="Total CGPA">
						<b>{data?.academicInfo?.cgpa}</b>
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Total Completed Credit">
						<b>
							{data?.academicInfo?.totalCompletedCredit}{' '}
							{data?.academicInfo?.totalCompletedCredit <= 1 ? 'credit' : 'credits'}
						</b>
					</Card>
				</Col>
			</Row>

			<div style={{ margin: '10px 0' }}>
				<PHUTable loading={isLoading} dataSource={data?.courses} columns={columns} showPagination={false} />
			</div>
		</>
	);
}
