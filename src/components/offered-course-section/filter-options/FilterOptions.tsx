import React from 'react';
import SemesterRegistrationFilter from './SemesterRegistrationFilter';
// import OfferedCourseFilter from './OfferedCourseFilter';

function FilterOptions() {
	return (
		<>
			{/* <div style={{ margin: '10px 0px' }}>
				<AcademicDepartmentFilter />
			</div> */}
			<div style={{ margin: '10px 0px' }}>
				<SemesterRegistrationFilter />
			</div>
			{/* <div style={{ margin: '10px 0px' }}>
				<OfferedCourseFilter />
			</div> */}
		</>
	);
}

export default FilterOptions;
