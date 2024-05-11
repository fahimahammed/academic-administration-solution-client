import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { ICoreStudent, IError, IOfferedCourse, IStudentEnrolledCourseMark, QueryParamsType } from '@/types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY, ExamType } from '@/constants';
import { ColumnsType } from 'antd/es/table';
import { Button, Tag, Tooltip } from 'antd';
import PHUTable from '@/ui/PHUTable';
import { ReloadOutlined } from '@ant-design/icons';
import PHUButton from '@/ui/PHUButton';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import {
	useStudentEnrolledCourseMarksQuery,
	useUpdateFinalMarksMutation,
} from '@/redux/apis/base-admin/student/studentEnrollCourseMarkApi';
import BaseRow from '../base/BaseRow';
import { setDefault, setSort } from '@/redux/slices/StudentEnrolledCourseMarkSlice';
import { useRouter } from 'next/router';
import PHUModal from '@/ui/PHUModal';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';

const StudentCourseMarks = () => {
	const router = useRouter();
	const { studentId, academicSemesterId, courseId, offeredCourseSectionId } = router.query;
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const studentEnrolledCourseMarkState = useSelector((state: RootState) => state.studentEnrolledCourseMark);

	// will be remove very soon
	useEffect(() => {
		return () => {
			dispatch(setDefault());
		};
	}, []);

	const query: Record<string, QueryParamsType> = {};
	const showResetFilterOption = useMemo(() => {
		return (
			!!searchTerm ||
			!!studentEnrolledCourseMarkState?.sortBy ||
			!!studentEnrolledCourseMarkState?.sortOrder ||
			!!studentEnrolledCourseMarkState?.filterOptions?.studentEnrolledCourseId
		);
	}, [
		searchTerm,
		studentEnrolledCourseMarkState?.sortBy,
		studentEnrolledCourseMarkState?.sortOrder,
		studentEnrolledCourseMarkState?.filterOptions?.studentEnrolledCourseId,
	]);

	const [updateFinalMarks] = useUpdateFinalMarksMutation();

	query['limit'] = size;
	query['page'] = page;
	if (!!studentEnrolledCourseMarkState?.sortBy) {
		query['sortBy'] = studentEnrolledCourseMarkState?.sortBy;
	}
	if (!!studentEnrolledCourseMarkState?.sortOrder) {
		query['sortOrder'] = studentEnrolledCourseMarkState?.sortOrder;
	}
	if (!!studentEnrolledCourseMarkState?.filterOptions?.studentEnrolledCourseId) {
		query['studentEnrolledCourseId'] = studentEnrolledCourseMarkState?.filterOptions?.studentEnrolledCourseId;
	}

	if (!!courseId || !!studentId || !!academicSemesterId) {
		query['courseId'] = courseId;
		query['studentId'] = studentId;
		query['academicSemesterId'] = academicSemesterId;
	}

	// if (!!studentId) {
	// 	query['studentId'] = studentId;
	// }

	// if (!!academicSemesterId) {
	// 	query['academicSemesterId'] = academicSemesterId;
	// }

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useStudentEnrolledCourseMarksQuery({ ...query });
	const studentEnrolledCourseMarks = data?.studentEnrolledCourseMarks;
	const meta = data?.meta;

	const columns: ColumnsType<IOfferedCourse> = [
		{
			title: 'Student Info',
			dataIndex: 'student',
			render: function (data: ICoreStudent) {
				return (
					<>
						<table>
							<BaseRow title="name">
								{data?.firstName} {data?.middleName} {data?.lastName}
							</BaseRow>
							<BaseRow title="student ID">{data?.userId}</BaseRow>
						</table>
					</>
				);
			},
		},
		{
			title: 'Grade info',
			render: function (data: IStudentEnrolledCourseMark) {
				return (
					<table>
						<BaseRow title="grade">{!data?.grade ? '-' : data?.grade}</BaseRow>
						<BaseRow title="total marks">{data?.marks}</BaseRow>
					</table>
				);
			},
		},
		{
			title: 'Academic semester',
			dataIndex: 'academicSemester',
			render: function (data) {
				return (
					<>
						{data?.title} - {data?.year}
					</>
				);
			},
		},
		{
			title: 'Exam type',
			dataIndex: 'examType',
			sorter: true,
			render: function (data) {
				return <Tag color={data === ExamType.MIDTERM ? 'magenta' : 'blue'}>{data}</Tag>;
			},
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			render: function (data: string) {
				return <>{formatDateTime(data)}</>;
			},
			sorter: true,
		},
		{
			title: 'Action',
			render: function (data: IStudentEnrolledCourseMark) {
				return (
					<>
						<Button
							type="primary"
							onClick={() => {
								router.push(
									`/faculty/update-mark?examType=${data?.examType}&marks=${data?.marks}&academicSemesterId=${academicSemesterId}&studentId=${studentId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`
								);
							}}
							style={{ marginLeft: '3px' }}
						>
							Update marks
						</Button>
					</>
				);
			},
		},
	];

	const onPaginationChange = (page: number, size: number) => {
		setSize(size);
		setPage(page);
	};

	const resetAllFilter = () => {
		setSearchTerm('');
		dispatch(setDefault());
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IOfferedCourse>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	const handleUpdateFinalMarks = async (values: object) => {
		try {
			await updateFinalMarks(values).unwrap();
			notifySuccess('final mark updated successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'faculty', link: '/faculty' },
					{ label: 'courses', link: '/faculty/courses' },
					{
						label: `student`,
						link: `/faculty/courses/student?courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}&academicSemesterId=${academicSemesterId}`,
					},
					{
						label: 'result',
						link: `/faculty/student-result?studentId=${studentId}&academicSemesterId=${academicSemesterId}&courseId=${courseId}`,
					},
				]}
			/>
			<ActionBar title="student marks">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>

				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<Button onClick={resetAllFilter} size="large" style={{ marginLeft: '5px' }}>
							<ReloadOutlined />
						</Button>
					</Tooltip>
				) : null}

				<div style={{ marginLeft: 'auto' }}>
					{data?.studentEnrolledCourseMarks
						.filter((el: IStudentEnrolledCourseMark) => el.examType === ExamType.FINAL)
						.map((el, index) => {
							if (el.marks > 0) {
								return (
									<Fragment key={index}>
										<PHUButton size="large" onClick={() => setOpen(true)}>
											Update final marks
										</PHUButton>
									</Fragment>
								);
							}
						})}
				</div>
			</ActionBar>

			<PHUTable
				loading={isLoading}
				columns={columns}
				dataSource={studentEnrolledCourseMarks}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="final marks"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => {
					handleUpdateFinalMarks({
						academicSemesterId,
						studentId,
						courseId,
					});
				}}
			>
				<p className="my-5">Do you want to update final marks?</p>
			</PHUModal>
		</>
	);
};

export default StudentCourseMarks;
