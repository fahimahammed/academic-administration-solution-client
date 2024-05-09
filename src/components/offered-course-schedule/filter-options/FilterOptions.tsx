import React from 'react';
import SemesterRegistrationFilter from './SemesterRegistrationFilter';
import CourseFilter from './OfferedCourseFilter';
import SectionFilter from './SectionFilter';

function FilterOptions() {
	return (
		<>
			{/* <div style={{ margin: '10px 0px' }}>
				<AcademicDepartmentFilter />
			</div> */}
			<div style={{ margin: '10px 0px' }}>
				<SemesterRegistrationFilter />
			</div>
			<div style={{ margin: '10px 0px' }}>
				<CourseFilter />
			</div>
			<div style={{ margin: '10px 0px' }}>
				<SectionFilter />
			</div>
		</>
	);
}

export default FilterOptions;
