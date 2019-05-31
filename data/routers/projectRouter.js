const express = require("express");
const router = express.Router();
const projectHelper = require("../helpers/projectModel.js");

router.get("/", async (req, res) => {
  try {
    const projects = await projectHelper.get();
    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(400).json({ Message: "There are no projects to display" });
    }
  } catch (error) {
    res.status(500).json({
      ErrorMessage: "There was an error while retrieving the projects."
    });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch (error) {
    res.status(500).json({
      ErrorMessage: "There was an error while retrieving the projects."
    });
  }
});

router.post("/", validateProject, async (req, res) => {
  try {
    const project = await projectHelper.insert(req.body);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ Message: "There was an error while inserting the project." });
  }
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  try {
    const projectId = req.params.id;
    const updateProject = await projectHelper.update(projectId, req.body);
    res.status(200).json(updateProject);
  } catch (error) {
    res
      .status(500)
      .json({ Message: "There was an error while updating the project." });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    const projectId = req.params.id;
    const deleteProject = await projectHelper.remove(projectId);
    res.status(200).json({ Message: "Project deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "There was an error while deleting the project." });
  }
});

// This is a custom middleware function to validate project Id
// The following validations have been performed.
// 1. Check if the id exist in the req params.
// 2. Check if id is not null 0 or empty string
// 3. Check if the id is available in the database
async function validateProjectId(req, res, next) {
  if (req.params.id) {
    if (req.params.id !== 0 && req.params.id !== null && req.params.id !== "") {
      const project = await projectHelper.get(req.params.id);
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({
          Message: "No project available for this post id in the database."
        });
      }
    } else {
      res
        .status(400)
        .json({ Message: "The project id provided is either null or empty." });
    }
  } else {
    res.status(400).json({ Message: "There is no project id available." });
  }
}

//This is a custom middleware to validate a project
// Following are the validations:
// 1. Validates the body on a request to create a new project
// 2. validate if request body is not missing else 400
// 3. validate if the request body has the name and description field
function validateProject(req, res, next) {
  if (req.body) {
    if (req.body.name && req.body.description) {
      next();
    } else {
      res
        .status(400)
        .json({ Message: "Missing required name field or description field" });
    }
  } else {
    res.status(400).json({ Message: "Missing project data." });
  }
}

module.exports = router;
