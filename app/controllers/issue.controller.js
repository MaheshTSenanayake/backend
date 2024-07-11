const db = require("../models");
const Issue = db.Issue;

exports.addissue = async (req, res) => {
  try {
    const issue = new Issue({
      title: req.body.title,
      description: req.body.description,
      severity: req.body.severity,
      priority: req.body.priority,
      status: "Open",
    });

    await issue.save();

    const issues = await Issue.find();

    res.send({
      message: "Issue added successfully",
      issues: issues,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getissues = async (req, res) => {
  await Issue.find()
    .then((issues) => {
      res.status(200).json(issues);
    })
    .catch((err) => {
      res.status(400).json({
        err: err,
      });
    });
};

exports.updateissue = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedIssue) {
      return res.status(404).send({ message: "Issue not found" });
    }

    const issues = await Issue.find();

    res.send({
      message: "Issue updated successfully",
      issues,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteissue = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedIssue = await Issue.findByIdAndDelete(id);

    if (!deletedIssue) {
      return res.status(404).send({ message: "Issue not found" });
    }

    const issues = await Issue.find();

    res.send({
      message: "Issue deleted successfully",
      issues: issues,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
