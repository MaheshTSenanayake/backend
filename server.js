const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const { verifyToken } = require("./app/middlewares/authJwt");
const initializeUsers = require("./app/utils/initializeUsers"); // Import the initialization script

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("Successfully connected to MongoDB");
    initializeUsers(); // Initialize users after successful connection
  })
  .catch((err) => {
    console.error("Connection Error", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the issue application" });
});

// Register routes
require("./app/routes/auth.routes")(app);
app.use(verifyToken);
require("./app/routes/issue.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
