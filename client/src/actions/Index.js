import axios from "axios";

export const GET_PROJECTS_START = "GET_PROJECTS_START";
export const GET_PROJECTS_SUCCESS = "GET_PROJECTS_SUCCESS";
export const GET_PROJECTS_FAILED = "GET_PROJECTS_FAILED";

export const URL = "http://localhost:8000/api/projects";

export const getProjects = () => dispatch => {
  dispatch({ type: GET_PROJECTS_START });
  axios
    .get(URL)
    .then(res => {
      console.log(
        ":: RESPONSE DATA FOR GET PROJECTS IS :: " + JSON.stringify(res)
      );
      dispatch({
        type: GET_PROJECTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(":: GET PROJECTS ERROR IS :: " + JSON.stringify(err));
      dispatch({
        type: GET_PROJECTS_FAILED,
        payload: err
      });
    });
};
