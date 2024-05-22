import { useFacultyQuery } from '@/redux/apis/base-admin/faculty/facultyApi';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { formatDateTime } from '@/utils/datetime-converter';
import { Col, Row } from 'antd';
import Image from 'next/image';

type EditStudentProps = {
	id: string | string[] | undefined;
	base?: string;
};

const FacultyDetails = ({ id, base }: EditStudentProps) => {
	const { data, isLoading } = useFacultyQuery(id);
	if (isLoading) return <Spinner />;

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'faculty', link: `/${base}/faculty` },
					{ label: 'details', link: '' },
					{ label: data?.userId, link: `/${base}/faculty/details/${data?.userId}` },
				]}
			/>
			<ActionBar title={`view faculty - ${data?.userId}`}></ActionBar>
			<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
				<Row gutter={24}>
					<Col span={8}>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

							{!data?.profileImage?.startsWith('http') ? (
								<Image src="/default-profile.png" width={200} height={200} alt={''} style={{ borderRadius: '50%' }} /> // Circular image
							) : (
								<Image src={`${data?.profileImage}`} width={200} height={200} alt={''} style={{ borderRadius: '50%' }} />
							)}

							<h3
								style={{
									margin: '10px 0px 0px 0px',
									fontWeight: '700',
									textTransform: 'capitalize'
								}}
							>
								{data?.firstName} {data?.middleName} {data?.lastName}
							</h3>
							<p>{data?.designation}</p>
							<small style={{ color: 'green', margin: '5px 0' }}>Joined {formatDateTime(data?.createdAt)}</small>
						</div>
					</Col>
					<Col span={16}>
						<table style={{ width: '100%' }}>


							<tr>
								<td colSpan={2}>
									<h2 style={{ marginBottom: '5px', color: '#000000A6' }}>Academic Information</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
								</td>
							</tr>
							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									Academic faculty
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>
									{data?.academicFaculty?.title}
								</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									Academic department
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>
									{data?.academicDepartment?.title}
								</td>
							</tr>

							<tr>
								<td colSpan={2}>
									<h2 style={{ marginBottom: '5px', marginTop: '20px', color: '#000000A6' }}>Personal Information</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
								</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									gender
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.gender}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									blood group
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.bloodGroup}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									DOB(date of birth)
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.dateOfBirth}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									email
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.email}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									Contact no.
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.contactNo}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									Emergency contact no.
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.emergencyContactNo}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									present address
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.presentAddress}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										// textAlign: 'right',
									}}
								>
									permanent address
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.permanentAddress}</td>
							</tr>
						</table>
					</Col>

				</Row>
			</div>
		</>
	);
};

export default FacultyDetails;
