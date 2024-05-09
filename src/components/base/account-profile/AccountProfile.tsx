import { useUserProfileQuery } from '@/redux/apis/userProfileApi';
import { Spinner } from '@/ui';
import { USER_ROLE } from '@/constants';
import { Col, Row } from 'antd';
import Image from 'next/image';

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
				<Row gutter={14}>
					<Col span={10}>
						<table style={{ width: '100%' }}>
							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										textAlign: 'right',
									}}
								>
									First Name
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.firstName}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										textAlign: 'right',
									}}
								>
									Middle Name
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.middleName}</td>
							</tr>

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										textAlign: 'right',
									}}
								>
									Last Name
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.lastName}</td>
							</tr>

							{role === USER_ROLE.STUDENT || role === USER_ROLE.FACULTY ? (
								<>
									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
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
												textAlign: 'right',
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
											textAlign: 'right',
										}}
									>
										Academic semester
									</td>
									<td style={{ textAlign: 'left', padding: '5px 15px' }}>
										{data?.academicSemester?.title}
									</td>
								</tr>
							) : null}

							{role === USER_ROLE.ADMIN || role === USER_ROLE.FACULTY ? (
								<tr style={{ margin: '0px 0px' }}>
									<td
										style={{
											fontWeight: 700,
											marginRight: '10px',
											textTransform: 'capitalize',
											textAlign: 'right',
										}}
									>
										designation
									</td>
									<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.designation}</td>
								</tr>
							) : null}

							<tr style={{ margin: '0px 0px' }}>
								<td
									style={{
										fontWeight: 700,
										marginRight: '10px',
										textTransform: 'capitalize',
										textAlign: 'right',
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
										textAlign: 'right',
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
										textAlign: 'right',
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
										textAlign: 'right',
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
										textAlign: 'right',
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
										textAlign: 'right',
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
										textAlign: 'right',
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
										textAlign: 'right',
									}}
								>
									permanent address
								</td>
								<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.permanentAddress}</td>
							</tr>

							{role === USER_ROLE.STUDENT ? (
								<>
									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											father name
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.guardian?.fatherName}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											father occupation
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.guardian?.fatherOccupation}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											father contact no.
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.guardian?.fatherContactNo}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											mother name
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.guardian?.motherName}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											mother occupation
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.guardian?.motherOccupation}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											mother contact no.
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.guardian?.motherContactNo}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											guardian address
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.guardian?.address}</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											local guardian name
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardian?.name}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											local guardian occupation
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardian?.occupation}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											local guardian address
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardian?.address}
										</td>
									</tr>

									<tr style={{ margin: '0px 0px' }}>
										<td
											style={{
												fontWeight: 700,
												marginRight: '10px',
												textTransform: 'capitalize',
												textAlign: 'right',
											}}
										>
											local contact no
										</td>
										<td style={{ textAlign: 'left', padding: '5px 15px' }}>
											{data?.localGuardian?.contactNo}
										</td>
									</tr>
								</>
							) : null}
						</table>
					</Col>
					<Col span={4}>
						{!data?.profileImage?.startsWith('https') || !data?.profileImage?.startsWith('http') ? (
							<Image src="/default-profile.png" width="300" height="300" alt={''} />
						) : (
							<Image src={`${data?.profileImage}`} width="300" height="300" alt={''} />
						)}
					</Col>
				</Row>
			</div>
		</>
	);
}
