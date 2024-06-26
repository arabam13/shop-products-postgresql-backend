const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const yaml = require("yamljs");
// const swaggerDocs = yaml.load("swagger.yaml");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const db = require("./models");
const productsRoutes = require("./routes/products.routes");
const { Dir } = require("fs");
db.sequelize.sync().then(() => console.log("db is ready"));
app.use("/api/products", productsRoutes);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// const __dirname = path.resolve();
// console.log(path.dirname(__dirname));
app.use(express.static(path.join(path.dirname(__dirname), "/front/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(path.dirname(__dirname), "/front/build/index.html"))
);

module.exports = app;
