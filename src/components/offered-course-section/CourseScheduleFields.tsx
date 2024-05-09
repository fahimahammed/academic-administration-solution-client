import { Button, Col, Empty, Row } from 'antd';
import React, { CSSProperties } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { blue } from '@ant-design/colors';
import { FormSelectField, FormTimePicker } from '../forms';
import { dayOptions } from '@/constants';
import RoomField from '../base/common-form-field/RoomField';
import BuildingField from '../base/common-field/BuildingField';
import { useDispatch, useSelector } from 'react-redux';
import { setBuildingId } from '@/redux/slices/buildingSlice';
import { RootState } from '@/redux';
import { QueryParamsType } from '@/types';
import FacultyField from '../base/common-form-field/FacultyField';

export default function CourseScheduleFields() {
	const { control } = useFormContext();
	const buildingState = useSelector((state: RootState) => state.building);
	const academicCoreDepartmentState = useSelector((state: RootState) => state.academicCoreDepartment);
	const dispatch = useDispatch();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'classSchedules',
	});

	const defaultValue = {
		dayOfWeek: '',
		startTime: '',
		endTime: '',
		roomId: '',
		facultyId: '',
	};

	let roomFieldStyle: Record<string, string> = {
		pointerEvents: 'none',
		opacity: '0.5',
	};

	let facultyFieldStyle: Record<string, string> = {
		pointerEvents: 'none',
		opacity: '0.5',
	};

	const roomQuery: Record<string, QueryParamsType> = {};
	const facultyQuery: Record<string, QueryParamsType> = {};

	if (!!buildingState.buildingId) {
		roomQuery['buildingId'] = buildingState.buildingId;
		roomFieldStyle = {
			pointerEvents: 'auto',
		};
	}

	if (!!academicCoreDepartmentState.academicDepartmentId) {
		facultyQuery['academicDepartmentId'] = academicCoreDepartmentState.academicDepartmentId;
		facultyFieldStyle = {
			pointerEvents: 'auto',
		};
	}

	return (
		<>
			{fields.length > 0 ? (
				fields.map((item, index) => {
					return (
						<div
							key={index}
							style={{
								marginBottom: '5px',
								padding: '20px',
								border: '1px solid #d9d9d9',
								borderRadius: '5px',
							}}
						>
							<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
								<Col span={8}>
									<FormSelectField
										options={dayOptions}
										name={`classSchedules.${index}.dayOfWeek`}
										label="day of week"
									/>
								</Col>
								<Col span={8}>
									<div>
										<FormTimePicker name={`classSchedules.${index}.startTime`} label="start time" />
									</div>
								</Col>
								<Col span={8}>
									<div>
										<FormTimePicker name={`classSchedules.${index}.endTime`} label="end time" />
									</div>
								</Col>

								<Col span={12} style={{ margin: '10px 0px' }}>
									<BuildingField
										onChange={el => {
											dispatch(setBuildingId(el));
										}}
										label="building"
										placeholder="select building"
									/>
								</Col>
								<Col span={12} style={{ margin: '10px 0px' }}>
									<div style={roomFieldStyle as CSSProperties}>
										<RoomField name={`classSchedules.${index}.roomId`} label="room" query={roomQuery} />
									</div>
								</Col>
								<Col span={12} style={{ margin: '10px 0px' }}>
									<div style={facultyFieldStyle as CSSProperties}>
										<FacultyField
											name={`classSchedules.${index}.facultyId`}
											label="faculty"
											query={facultyQuery}
										/>
									</div>
								</Col>
							</Row>

							<Button type="primary" onClick={() => remove(index)} danger style={{ margin: '5px 0px' }}>
								delete
							</Button>
						</div>
					);
				})
			) : (
				<>
					<Empty description="No class schedule found" />
				</>
			)}
			<div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0px' }}>
				<Button style={{ background: blue[6], color: '#fff' }} onClick={() => append(defaultValue)}>
					add class schedule
				</Button>
			</div>
		</>
	);
}
