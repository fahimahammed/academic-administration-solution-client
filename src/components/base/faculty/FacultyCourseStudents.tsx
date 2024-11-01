import { IFacultyCourseStudent, QueryParamsType } from '@/types';
import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import PHUTable from '@/ui/PHUTable';
import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PHUButton from '@/ui/PHUButton';
import { ReloadOutlined } from '@ant-design/icons';
import { useFacultyCourseStudentsQuery } from '@/redux/apis/base-admin/faculty/coreFacultyApi';
import { setDefault } from '@/redux/slices/facultySlice';
import { DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import { useRouter } from 'next/router';

export default function FacultyCourseStudents() {
	const router = useRouter();
	const { courseId, academicSemesterId, offeredCourseSectionId } = router.query;
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};
	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}
	query['limit'] = size;
	query['page'] = page;

	if (!!courseId) {
		query['courseId'] = courseId;
	}
	if (!!academicSemesterId) {
		query['academicSemesterId'] = academicSemesterId;
	}
	if (!!offeredCourseSectionId) {
		query['offeredCourseSectionId'] = offeredCourseSectionId;
	}
	//console.log(offeredCourseSectionId, "hello")

	const { data, isLoading } = useFacultyCourseStudentsQuery({ ...query });
	const dispatch = useDispatch();
	const meta = data?.meta;

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm;
	}, [searchTerm]);

	const columns: ColumnsType<IFacultyCourseStudent> = [
		{
			title: 'Student ID',
			dataIndex: 'userId'
		},
		{
			title: 'Student name',
			render: function (data: IFacultyCourseStudent) {
				return (
					<>
						{data?.firstName} {data?.middleName} {data?.lastName}
					</>
				);
			},
		},
		{
			title: 'email',
			dataIndex: 'email',
		},
		{
			title: 'Contact no',
			dataIndex: 'contactNo',
		},
		{
			title: 'Result',
			dataIndex: 'courseMarks',
			render: function (data: any) {
				return (
					<>
						{data.map((result: { examType: string, marks: number }, index: number) => {
							return (<Tag color={result.examType === 'FINAL' ? 'green' : 'red'} key={index}>
								{result.examType}: <strong>{result.marks}</strong>
							</Tag>)
						})}
					</>
				)
			}
		},
		{
			title: 'action',
			render: function (data: IFacultyCourseStudent) {
				return (
					<>
						<PHUButton
							onClick={() => {
								router.push(
									`/faculty/student-result?studentId=${data?.id}&academicSemesterId=${academicSemesterId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`
								);
							}}
						>
							View Marks
						</PHUButton>
					</>
				);
			},
		},
	];

	const resetAllFilter = () => {
		dispatch(setDefault());
		setSearchTerm('');
	};

	const onPaginationChange = (page: number, size: number) => {
		setSize(size);
		setPage(page);
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `faculty`, link: `/faculty` },
					{ label: `courses`, link: `/faculty/courses` },
					{
						label: `student`,
						link: `/faculty/courses/student?courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}&academicSemesterId=${academicSemesterId}`,
					},
				]}
			/>
			<ActionBar title="course student list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<PHUButton onClick={resetAllFilter} size="large" style={{ marginLeft: '10px' }}>
							<ReloadOutlined />
						</PHUButton>
					</Tooltip>
				) : null}
			</ActionBar>

			<PHUTable
				loading={isLoading}
				columns={columns}
				dataSource={data?.myCourseStudents}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
			/>
		</>
	);
}
