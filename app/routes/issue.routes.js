//const { authJwt } = require("../middlewares");
const controller = require("../controllers/issue.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/issue/addissue", controller.addissue);
  app.get("/api/issue/getissues", controller.getissues);
  app.put("/api/issue/updatebyid/:id", controller.updateissue);
  app.delete("/api/issue/deletebyid/:id", controller.deleteissue);
};
