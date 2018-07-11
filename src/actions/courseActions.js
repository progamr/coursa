import * as types from './actionTypes';
import CourseApi from './../api/mockCourseApi';
export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}
export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}
export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

// Courses thunks
export function loadCourses() {
    // Role: handle a promise and dispatch an action when the promise is resolved
    return function (dispatch) {
        return CourseApi.getAllCourses().then(courses => {
          dispatch(loadCoursesSuccess(courses));
        }).catch(err => {
          throw(err);
        });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        return CourseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(err => {
            throw(err);
        });
    };
}
