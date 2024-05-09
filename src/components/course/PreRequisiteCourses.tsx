import { DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import { useCoursesQuery } from '@/redux/apis/courseApi';
import { CourseUpdatePayload, ICourse, IPreRequisite, QueryParamsType, SelectOption } from '@/types';
import Table from '@/ui/Table';
import { Button, Tag, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import { MultiSelectField } from '@/ui';
import { useFormContext } from 'react-hook-form';

type PreRequisiteCoursesProps = {
	prerequisites: Array<IPreRequisite>;
};

export default function PreRequisiteCourses({ prerequisites }: PreRequisiteCoursesProps) {
	const prerequisiteList = useMemo(() => {
		return prerequisites;
	}, [prerequisites]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [prerequisiteRequestList, setPrerequisiteRequestList] = useState<CourseUpdatePayload[]>([]);
	const {
		formState: { defaultValues },
		setValue,
	} = useFormContext();
	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});
	const [prerequisiteCourses, setSelectedPreRequisiteCourses] = useState<IPreRequisite[]>([]);

	const query: Record<string, QueryParamsType> = {};

	useEffect(() => {
		setValue('coursePreRequisites', prerequisiteRequestList);
	}, [prerequisiteRequestList, setValue]);

	useEffect(() => {
		setSelectedPreRequisiteCourses(prerequisiteList);
	}, [prerequisiteList]);

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}
	const { data, isLoading } = useCoursesQuery({ ...query });

	const columns: ColumnsType<IPreRequisite> = [
		{
			title: 'Title',
			render: function (data: IPreRequisite) {
				return (
					<>
						{data?.prerequisite?.title}
						{data?.isNew ? (
							<Tag color="blue" style={{ margin: '0px 10px' }}>
								new
							</Tag>
						) : (
							''
						)}
					</>
				);
			},
		},
		{
			title: 'Action',
			render: function (data: IPreRequisite) {
				return (
					<>
						{!data?.isNew ? (
							<Button
								type="primary"
								danger
								style={{ marginLeft: '3px' }}
								onClick={() => {
									/**
									 * * prepare pre-requisite request list for deleting
									 * */
									setPrerequisiteRequestList([
										...prerequisiteRequestList,
										{
											courseId: data?.prerequisite?.id,
											isDeleted: true,
										},
									]);
									/**
									 * *findout the latest data after deleting
									 * */
									const latestData = prerequisiteCourses.filter(
										(el: IPreRequisite) => el?.prerequisite.id !== data?.prerequisite?.id
									);

									/**
									 * * set the latest data
									 * */
									setSelectedPreRequisiteCourses([...latestData]);
								}}
							>
								remove
							</Button>
						) : null}
					</>
				);
			},
		},
	];

	const courseOptions = data?.courses.map((course: ICourse) => {
		return {
			label: course?.title,
			value: course?.id,
		};
	});

	return (
		<>
			<MultiSelectField
				options={courseOptions as SelectOption[]}
				onSearch={(e: string) => setSearchTerm(e)}
				handleChange={(el: string[]) => {
					/**
					 * * find out the self course
					 * */
					const isSelfCourseFound = !!defaultValues?.prerequisites.find((course: IPreRequisite) =>
						el.includes(course.courseId)
					);
					/**
					 * * find out the duplicate course
					 * */
					const isDuplicatePrerequisiteCourseFound = !!defaultValues?.prerequisites.find((course: IPreRequisite) =>
						el.includes(course.prerequisiteId)
					);

					/**
					 * * validation for restricting update facility for specific course you are updating
					 * */
					if (isSelfCourseFound) {
						message.error("can't select same course for pre-requisite");
					} else if (isDuplicatePrerequisiteCourseFound) {
						/**
						 * * validation for restricting update facility for adding existing pre requisite course
						 * */
						message.error('course is already exists in your pre-requisite list');
					} else {
						/**
						 * * add new course to pre-requisite request list
						 * */
						const selectedData = data?.courses
							.filter(course => el.includes(course.id))
							.map(el => {
								return {
									courseId: el.id,
								};
							});

						/**
						 * * add new course to pre-requisite modified list
						 * */
						const selectedPreRequisiteData = data?.courses
							.filter(course => el.includes(course.id))
							.map(el => {
								const prerequisite = {
									id: el.id,
									title: el.title,
								};
								return {
									prerequisite,
									isNew: true,
								};
							});

						/**
						 * * prepare request list for update course pre-requisite
						 */
						if (selectedData) {
							setPrerequisiteRequestList([...defaultValues?.coursePreRequisites, ...selectedData]);
						}
						/**
						 * * prepare list for showing modified pre-requisite list in ui
						 * */
						if (selectedPreRequisiteData) {
							setSelectedPreRequisiteCourses([...defaultValues?.prerequisites, ...selectedPreRequisiteData]);
						}
					}
				}}
				loading={isLoading}
			/>
			<Table columns={columns} dataSource={prerequisiteCourses} />
		</>
	);
}
