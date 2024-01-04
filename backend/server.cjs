const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.cjs");
const { errorHandler } = require("./middleware/errorMiddleware.cjs");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user/", require("./routes/user.route.cjs"));
app.use("/api/hotel/", require("./routes/hotel.route.cjs"));
app.use("/api/business/", require("./routes/company.route.cjs"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
