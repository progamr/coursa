import * as types from './actionTypes';
import AuthoeApi from './../api/mockAuthorApi';
export function loadAuthorssSuccess(authors) {
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

// Authors thunks
export function loadAutthors() {
    // Role: handle a promise and dispatch an action when the promise is resolved
    return function (dispatch) {
        return AuthoeApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorssSuccess(authors));
        }).catch(err => {
            throw err;
        });
    };
}
