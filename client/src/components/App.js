import React from "react";

import "./App.css";

import { Route } from "react-router-dom";
import Project from "./Project";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <h1> List of Projects!</h1>
        {/* <div className="appList">
          {this.props.projects.map(project => (
            <div className="appCard" key={project.id}>
              <span className="title">Project Name:</span> {project.name}
            </div>
          ))}
        </div> */}
        <Route path="/projects" component={Project} />
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

export default App;
