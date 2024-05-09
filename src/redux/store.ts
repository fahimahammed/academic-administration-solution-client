import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userSlice from './slices/userSlice';
import facultySlice from './slices/facultySlice';
import studentSlice from './slices/studentSlice';
import academicDepartmentSlice from './slices/academic/departmentSlice';
import adminSlice from './slices/adminSlice';
import { baseApi } from './apis';
import studentApi from './apis/base-admin/student/studentApi';
import facultyApi from './apis/base-admin/faculty/facultyApi';
import adminApi from './apis/base-admin/admin/adminApi';
import userApi from './apis/userApi';
import permissionApi from './apis/permissionApi';
import authApi from './apis/authApi';
import userProfileApi from './apis/userProfileApi';
import departmentApi from './apis/departmentApi';
import roomSlice from './slices/roomSlice';
import academicCoreSemesterSlice from './slices/academic/coreSemesterSlice';
import offeredCourseSlice from './slices/offeredCourseSlice';
import offeredCourseSectionSlice from './slices/offeredCourseSectionSlice';
import offeredCourseScheduleSlice from './slices/offeredCourseScheduleSlice';
import offeredCourseApi from './apis/offeredCourseApi';
import offeredCourseSectionApi from './apis/offerdCourseSectionApi';
import courseApi from './apis/courseApi';
import roomApi from './apis/roomApi';
import buildingApi from './apis/buildingApi';
import coreStudentApi from './apis/base-admin/student/coreStudentApi';
import coreFacultyApi from './apis/base-admin/faculty/coreFacultyApi';
import coreAcademicSemsterApi from './apis/academic/coreAcademicSemesterApi';
import academicCoreDepartmentSlice from './slices/academic/coreDepartmentSlice';
import semesterRegistrationSlice from './slices/semesterRegistrationSlice';
import buildingSlice from './slices/buildingSlice';
import studentEnrolledCourseMarkSlice from './slices/StudentEnrolledCourseMarkSlice';
import studentEnrollCourseMarkApi from './apis/base-admin/student/studentEnrollCourseMarkApi';
import studentEnrollCourseApi from './apis/base-admin/student/studentEnrollCourseApi';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[studentApi.reducerPath]: studentApi.reducer,
		[facultyApi.reducerPath]: facultyApi.reducer,
		[adminApi.reducerPath]: adminApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[permissionApi.reducerPath]: permissionApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userProfileApi.reducerPath]: userProfileApi.reducer,
		[departmentApi.reducerPath]: departmentApi.reducer,
		[offeredCourseApi.reducerPath]: offeredCourseApi.reducer,
		[offeredCourseSectionApi.reducerPath]: offeredCourseSectionApi.reducer,
		[courseApi.reducerPath]: courseApi.reducer,
		[roomApi.reducerPath]: roomApi.reducer,
		[buildingApi.reducerPath]: buildingApi.reducer,
		[coreStudentApi.reducerPath]: coreStudentApi.reducer,
		[coreFacultyApi.reducerPath]: coreFacultyApi.reducer,
		[coreAcademicSemsterApi.reducerPath]: coreAcademicSemsterApi.reducer,
		[studentEnrollCourseMarkApi.reducerPath]: studentEnrollCourseMarkApi.reducer,
		[studentEnrollCourseApi.reducerPath]: studentEnrollCourseApi.reducer,
		auth: authReducer,
		user: userSlice,
		faculty: facultySlice,
		admin: adminSlice,
		student: studentSlice,
		academicDepartment: academicDepartmentSlice,
		room: roomSlice,
		academicCoreSemester: academicCoreSemesterSlice,
		offeredCourse: offeredCourseSlice,
		offeredCourseSection: offeredCourseSectionSlice,
		offeredCourseSchedule: offeredCourseScheduleSlice,
		academicCoreDepartment: academicCoreDepartmentSlice,
		semesterRegistration: semesterRegistrationSlice,
		building: buildingSlice,
		studentEnrolledCourseMark: studentEnrolledCourseMarkSlice,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
