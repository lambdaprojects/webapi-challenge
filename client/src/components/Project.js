import React from "react";
import { connect } from "react-redux";
import { getProjects } from "../actions";

class Project extends React.Component {
  componentDidMount() {
    console.log(":: COMPONENT DID MOUNT ::");
    this.props.getProjects();
  }

  render() {
    return (
      <div className="appList">
        {this.props.projects.map(project => (
          <div className="appCard" key={project.id}>
            <p>
              <span className="title">Project Name:</span> {project.name}
            </p>
            <span className="title">Description:</span> {project.description}
          </div>
        ))}
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
)(Project);
