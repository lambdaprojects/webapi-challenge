const express = require("express");
const router = express.Router();
const actionHelper = require("../helpers/actionModel.js");

router.get("/", async (req, res) => {
  try {
    const actions = await actionHelper.get();
    if (actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(400).json({ Message: "There are no actions to display" });
    }
  } catch (error) {
    res.status(500).json({
      ErrorMessage: "There was an error while retrieving the actions."
    });
  }
});

router.get("/:id", validateActionId, async (req, res) => {
  try {
    res.status(200).json(req.action);
  } catch (error) {
    res.status(500).json({
      ErrorMessage: "There was an error while retrieving the actions."
    });
  }
});

// This is a custom middleware function to validate action Id
// The following validations have been performed.
// 1. Check if the id exist in the req params.
// 2. Check if id is not null 0 or empty string
// 3. Check if the id is available in the database
async function validateActionId(req, res, next) {
  if (req.params.id) {
    if (req.params.id !== 0 && req.params.id !== null && req.params.id !== "") {
      const action = await actionHelper.get(req.params.id);
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({
          Message: "No action available for this post id in the database."
        });
      }
    } else {
      res
        .status(400)
        .json({ Message: "The action id provided is either null or empty." });
    }
  } else {
    res.status(400).json({ Message: "There is no action id available." });
  }
}

module.exports = router;
