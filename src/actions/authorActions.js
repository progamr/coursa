import * as types from './actionTypes';
import AuthoeApi from './../api/mockAuthorApi';
import {beginAjaxCall} from "./ajaxStatusActions";
export function loadAuthorssSuccess(authors) {
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

// Authors thunks
export function loadAutthors() {
    // Role: handle a promise and dispatch an action when the promise is resolved
    return  dispatch => {
      dispatch(beginAjaxCall());
      return AuthoeApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorssSuccess(authors));
        }).catch(err => {
            throw err;
        });
    };
}
