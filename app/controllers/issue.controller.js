const db = require("../models");
const Issue = db.Issue;

exports.addissue = async (req, res) => {
  try {
    const issue = new Issue({
      title: req.body.title,
      description: req.body.description,
      severity: req.body.severity,
      priority: req.body.priority,
      status: req.body.status,
    });

    await issue.save();
    res.send({ message: "Issue added successfully" });
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
