import React from "react";

import "./App.css";
import { connect } from "react-redux";
import { getProjects } from "../actions";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(":: COMPONENT DID MOUNT ::");
    this.props.getProjects();
  }

  render() {
    return (
      <div className="App">
        <h1> List of Projects!</h1>
        <div className="appList">
          {this.props.projects.map(project => (
            <div className="appCard" key={project.id}>
              <span className="title">Project Name:</span> {project.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(":: MAP STATE TO PROPS ::" + state.projects);
  return {
    projects: state.projects,
    error: state.error,
    fetchingProjects: state.fetchingProjects
  };
};

export default connect(
  mapStateToProps,
  { getProjects }
)(App);
