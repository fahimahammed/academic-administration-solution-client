import { useMyCoursesQuery } from '@/redux/apis/base-admin/student/coreStudentApi';
import { ICourse, IMyCourse, QueryParamsType } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import PHUTable from '@/ui/PHUTable';
import { Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import AcademicSemesterFilter from './filter-options/AcademicSemesterFilter';
import { RootState } from '@/redux';
import { useDispatch, useSelector } from 'react-redux';
import PHUButton from '@/ui/PHUButton';
import { setDefault } from '@/redux/slices/academic/coreSemesterSlice';
import { ReloadOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import LinkButton from '@/ui/LinkButton';

export default function EnrolledCourses() {
	const query: Record<string, QueryParamsType> = {};
	const coreAcademicSemesterState = useSelector((state: RootState) => state.academicCoreSemester);

	if (!!coreAcademicSemesterState?.filterOptions?.academicSemesterId) {
		query['academicSemesterId'] = coreAcademicSemesterState?.filterOptions?.academicSemesterId;
	}

	const { data, isLoading } = useMyCoursesQuery({ ...query });
	const dispatch = useDispatch();
	const showResetFilterOption = useMemo(() => {
		return !!coreAcademicSemesterState?.filterOptions?.academicSemesterId;
	}, [coreAcademicSemesterState?.filterOptions?.academicSemesterId]);

	const columns: ColumnsType<IMyCourse> = [
		{
			title: 'Course name',
			dataIndex: 'course',
			render: function (data: ICourse) {
				return <>{data.title}</>;
			},
		},
		{
			title: 'Code',
			dataIndex: 'course',
			render: function (data: ICourse) {
				return <>{data.code}</>;
			},
		},
		{
			title: 'Credit',
			dataIndex: 'course',
			render: function (data: ICourse) {
				return <>{data.credits}</>;
			},
		},
		{
			title: 'Status',
			dataIndex: 'status',
		},
		{
			title: 'Grade',
			dataIndex: 'grade',
			render: function (data: string) {
				return <>{!data ? <>-</> : data}</>;
			},
		},
		{
			title: 'Points',
			dataIndex: 'point',
		},
		{
			title: 'Total marks',
			dataIndex: 'totalMarks',
		},
		{
			title: 'Action',
			render: function (data: IMyCourse) {
				return (
					<>
						<LinkButton
							link={`/student/courses/marks?academicSemesterId=${data.academicSemesterId}&courseId=${data?.courseId}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
					</>
				);
			},
		},
	];

	const resetAllFilter = () => {
		dispatch(setDefault());
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `student`, link: `/student` },
					{ label: `courses`, link: `/student/courses` },
				]}
			/>

			<ActionBar title="my courses">
				<AcademicSemesterFilter />
				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<PHUButton onClick={resetAllFilter} size="large" style={{ marginLeft: '10px' }}>
							<ReloadOutlined />
						</PHUButton>
					</Tooltip>
				) : null}
			</ActionBar>

			<PHUTable loading={isLoading} dataSource={data?.myCourses} columns={columns} showPagination={false} />
		</>
	);
}
