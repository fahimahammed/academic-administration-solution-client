import { useUserProfileQuery } from '@/redux/apis/userProfileApi';
import { Spinner } from '@/ui';
import { USER_ROLE } from '@/constants';
import { Col, Row, Tag } from 'antd';
import Image from 'next/image';
import { formatDateTime } from '@/utils/datetime-converter';

type AccountProfileType = {
	title?: string;
	role?: string;
};

export default function AccountProfile({ title, role }: AccountProfileType) {
	const { data, isLoading } = useUserProfileQuery({});

	if (isLoading) return <Spinner />;


	return (
		<>
			<div className="px-4 sm:px-0">
				<h3 style={{ margin: '10px 0px' }}>{title}</h3>
			</div>

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

							{role === USER_ROLE.ADMIN || role === USER_ROLE.FACULTY ? (
								<p>{data?.designation}</p>
							) : null}

							{role === USER_ROLE.STUDENT ? (
								<p style={{ margin: '5px 0' }}>ID: {data?.userId}</p>
							) : null}

							<small style={{ color: 'green', margin: '5px 0' }}>Joined {formatDateTime(data?.createdAt)}</small>

							<Tag color='#87d068'>{role}</Tag>
						</div>


					</Col>
					<Col span={16}>
						<table style={{ width: '100%' }}>

							{role === USER_ROLE.STUDENT || role === USER_ROLE.FACULTY ? (
								<>
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
								</>
							) : null}

							{role === USER_ROLE.STUDENT ? (
								<tr style={{ margin: '0px 0px' }}>
									<td
										style={{
											fontWeight: 700,
											marginRight: '10px',
											textTransform: 'capitalize',
											// textAlign: 'right',
										}}
									>
										Academic semester
									</td>
									<td style={{ textAlign: 'left', padding: '5px 15px' }}>
										{data?.academicSemester?.title}
									</td>
								</tr>
							) : null}

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

							{role === USER_ROLE.STUDENT ? (
								<>
									<tr>
										<td colSpan={2}>
											<h2 style={{ marginBottom: '5px', marginTop: '20px', color: '#000000A6' }}>Guardian Information</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
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
											father name
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.fatherName}
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
											father occupation
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.fatherOccupation}
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
											father contact no.
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.fatherContactNo}
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
											mother name
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.motherName}
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
											mother occupation
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.motherOccupation}
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
											mother contact no.
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.motherContactNo}
										</td>
									</tr>


									<tr>
										<td colSpan={2}>
											<h2 style={{ marginBottom: '5px', marginTop: '20px', color: '#000000A6' }}>Local Guardian Information</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
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
											local guardian name
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardianName}
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
											local guardian occupation
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardianOccupation}
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
											local guardian address
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardianAddress}
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
											local contact no
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardianContactNo}
										</td>
									</tr>
								</>
							) : null}
						</table>
					</Col>

				</Row>
			</div>
		</>
	);
}
