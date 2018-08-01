import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from './../../actions/courseActions';
import CourseForm from './../course/CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
          saving: false
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            // Necessary to populate form when existing course is loaded directly
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
          .then(() => { this.redirect(); })
          .catch( error => {
            toastr.error(error);
            this.setState({saving: false});
          });
        // redirect to /courses after save
    }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('courses');
  }

    render() {
        return (
                <CourseForm
                  course={this.state.course}
                  allAuthors={this.props.authors}
                  onChange={this.updateCourseState}
                  onSave={this.saveCourse}
                  errors={this.state.errors}
                  saving={this.state.saving}
                />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the react router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if(course) return course[0];    // since filter returns an array, have to grab the first element of the array
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; // from the path `/course/:id`
    let course = {id:'', title:'', watchHref:'', authoirId: '', length:'', category:''};
    if(courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }
    const authorsFormattedForDropDown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropDown
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)    // All courseActions will bw available under this.props.actions
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
