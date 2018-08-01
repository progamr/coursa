import * as types from './../actions/actionTypes';
import initialState from './initialState';

// will handle the same action in multiple reducers so any action type that ends in success
// will now be handled here as will as in another reducer
function actionTypeEndInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallaInProgress, action) {
  if(action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if(action.type === types.AJAX_CALL_ERROR ||
    actionTypeEndInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
