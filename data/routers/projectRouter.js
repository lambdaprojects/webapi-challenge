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
    res
      .status(500)
      .json({
        ErrorMessage: "There was an error while retrieving the projects."
      });
  }
});

module.exports = router;
