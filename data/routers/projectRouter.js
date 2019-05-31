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

module.exports = router;
