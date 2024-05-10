import { useCoreFacultyQuery } from '@/redux/apis/base-admin/faculty/coreFacultyApi';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import React from 'react';

export default function FacultyInfo({ userId }: { userId: string }) {
	const { data, isLoading } = useCoreFacultyQuery(userId);
	if (isLoading) return <Spinner />;
	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `student`, link: `/student` },
					{ label: `faculty`, link: '' },
					{ label: `view`, link: `/student/faculty/${userId}` },
				]}
			/>
			<ActionBar title="Faculty info" />
			<table>
				<tr style={{ margin: '0px 0px' }}>
					<td
						style={{
							fontWeight: 700,
							marginRight: '10px',
							textTransform: 'capitalize',
							textAlign: 'left',
						}}
					>
						Faculty name
					</td>
					<td style={{ textAlign: 'left', padding: '5px 15px' }}>
						{data?.firstName} {data?.lastName} {data?.middleName}
					</td>
				</tr>

				<tr style={{ margin: '0px 0px' }}>
					<td
						style={{
							fontWeight: 700,
							marginRight: '10px',
							textTransform: 'capitalize',
							textAlign: 'left',
						}}
					>
						faculty
					</td>
					<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.academicFaculty?.title}</td>
				</tr>

				<tr style={{ margin: '0px 0px' }}>
					<td
						style={{
							fontWeight: 700,
							marginRight: '10px',
							textTransform: 'capitalize',
							textAlign: 'left',
						}}
					>
						department
					</td>
					<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.academicDepartment?.title}</td>
				</tr>

				<tr style={{ margin: '0px 0px' }}>
					<td
						style={{
							fontWeight: 700,
							marginRight: '10px',
							textTransform: 'capitalize',
							textAlign: 'left',
						}}
					>
						designation
					</td>
					<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.designation}</td>
				</tr>

				<tr style={{ margin: '0px 0px' }}>
					<td
						style={{
							fontWeight: 700,
							marginRight: '10px',
							textTransform: 'capitalize',
							textAlign: 'left',
						}}
					>
						contact no
					</td>
					<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.contactNo}</td>
				</tr>

				<tr style={{ margin: '0px 0px' }}>
					<td
						style={{
							fontWeight: 700,
							marginRight: '10px',
							textTransform: 'capitalize',
							textAlign: 'left',
						}}
					>
						email
					</td>
					<td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.email}</td>
				</tr>
			</table>
		</>
	);
}
