import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILED,
  GET_PROJECTS_START
} from "../actions";

const initialState = {
  fetchingProjects: false,
  projects: [],
  error: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS_START:
      return {
        ...state,
        error: "",
        fetchingProjects: true
      };

    case GET_PROJECTS_SUCCESS:
      console.log(
        ":: GET PROJECTS SUCCESS ::" + JSON.stringify(action.payload)
      );
      return {
        ...state,
        projects: action.payload,
        fetchingProjects: false
      };

    case GET_PROJECTS_FAILED:
      return {
        ...state,
        error: action.payload,
        fetchingProjects: false
      };
    default: {
      return state;
    }
  }
}
export default reducer;
