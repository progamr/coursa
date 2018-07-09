import * as types from './actionTypes';
import CourseApi from './../api/mockCourseApi';
export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

// Courses thunks
export function loadCourses() {
    // Role: handle a promise and dispatch an action when the promise is resolved
    return function (dispatch) {
        return CourseApi.getAllCourses().then(courses => {
          dispatch(loadCoursesSuccess(courses));
        }).catch(err => {
          throw err;
        });
    };
}
