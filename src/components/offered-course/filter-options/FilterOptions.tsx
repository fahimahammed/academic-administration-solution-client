import React from 'react';
import AcademicDepartmentFilter from './AcademicDepartmentFitler';
import SemesterRegistrationFilter from './SemesterRegistrationFilter';
import CourseFilter from './CourseFilter';

function FilterOptions() {
	return (
		<>
			<div style={{ margin: '10px 0px' }}>
				<AcademicDepartmentFilter />
			</div>
			<div style={{ margin: '10px 0px' }}>
				<SemesterRegistrationFilter />
			</div>
			<div style={{ margin: '10px 0px' }}>
				<CourseFilter />
			</div>
		</>
	);
}

export default FilterOptions;
