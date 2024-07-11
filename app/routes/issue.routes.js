const controller = require("../controllers/issue.controller");
const { verifyRoleAccess } = require("../middlewares/userRole");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/issue/addissue",
    verifyRoleAccess("admin"),
    controller.addissue
  );
  app.get(
    "/api/issue/getissues",
    verifyRoleAccess("admin", "user", "viewer"),
    controller.getissues
  );
  app.put(
    "/api/issue/updatebyid/:id",
    verifyRoleAccess("admin", "user"),
    controller.updateissue
  );
  app.delete(
    "/api/issue/deletebyid/:id",
    verifyRoleAccess("admin"),
    controller.deleteissue
  );
};
