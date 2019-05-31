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

router.get("/:id", async (req, res) => {
  try {
    const actions = await actionHelper.get(req.params.id);
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

module.exports = router;
