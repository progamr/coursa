import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as courseActions from './../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component{

  constructor(props, context) {
    super(props, context);
    /*this.state = {
      course: {title: ""}
    };*/

    //this.onClickSave = this.onClickSave.bind(this);
    //this.onTitleChange = this.onTitleChange.bind(this);
  }

  /*onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course:course});
  }
  onClickSave() {
    this.props.actions.createCourse(this.state.course);
  }*/

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    const {courses} = this.props;
    return(
      <div>
          <h1>Courses</h1>
          <Link to={'/course/'} className="btn btn-primary">Add Course</Link>
          <CourseList courses={courses}/>
      </div>
    );
}
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
