const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 3001;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", require("./routes/userRoutes"));
app.use("/instructors", require("./routes/instructorRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/boughtcourse", require("./routes/boughtCoursesRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
