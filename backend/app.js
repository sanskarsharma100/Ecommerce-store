const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

dotenv.config({ path: "config/config.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(fileUpload());

//Route Imports
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const cart = require("./routes/cartRoute");
const order = require("./routes/orderRoute");
const category = require("./routes/categoryRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", category);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
