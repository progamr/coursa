import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import './styles/styles.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {loadCourses} from './actions/courseActions';

const store = configureStore();
// load courses
store.dispatch(loadCourses());
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
