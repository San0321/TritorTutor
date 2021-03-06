import React from 'react'
import { Grid, Col, Image, Well, Button, PanelGroup, Panel, ListGroup, ListGroupItem, Label, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import axios from 'axios'
import Dispatch from '../Dispatch'

class TutorSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: null,
      courses: []
    };
  }

  componentWillMount() {
    // Get who we are currently logged in as.
    Dispatch.addListener('getUserInfo', (data) => {
      if (data.component == this) {
        this.setState({ userID: data.user.userID })

        axios.get('/api/tutor/' + data.user.userID + '/courses')
          .then((results) => {
            this.setState({courses: results.data})
          });
      }
    });

    var action = Dispatch.createAction('requestUserInfo');
    action.set('component', this);
    action.dispatch();
  }

  delete(classID) {
    console.log("Inside delete");
    console.log(classID);
    axios.delete('/api/tutor/' + classID)
      .then(() => {
        window.location.reload();
      })
  }

  render() {
    var courseList;
    var courses = this.state.courses;
    var negotiable;

    if(courses.length < 1) {
      courseList = <em>Currently you are tutoring no class.</em>;
    } else {
        courseList = courses.map((course) => {
          if (course.negotiable) {
            negotiable = <Label bsStyle='info'>Price Negotiable</Label>
          } else {
            negotiable = <Label></Label>
          }

          return (<ListGroupItem>
            <h4>
              <Link to={'/course/' + course.classID}>{course.classID}</Link> {' '}
              <Label>${parseFloat(course.price).toFixed(2)}</Label> {' '}
              {negotiable}
              <Button className="pull-right" bsStyle ="danger" bsSize = "small" onClick={this.delete.bind(this,course.classID)}>
              <Glyphicon glyph="remove"/></Button>
            </h4>
          </ListGroupItem>);       
      });
    }

    return (
      <div>
        <Panel header="Courses that you Tutor">
          <ListGroup>
            {courseList}
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

TutorSettings.displayName = 'TutorSettings'

export default TutorSettings