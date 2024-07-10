const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/adduser", controller.addUser);
  app.get("/api/user/getusers", controller.getUsers);
  app.put("/api/user/updatebyid/:id", controller.updateUser);
  app.delete("/api/user/deletebyid/:id", controller.deleteUser);
};
