const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport')
const cors = require("cors");
const port = process.env.PORT || 3000;
const db = require("./database/db");
db();
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const todoApi = require("./routes/todoRoute");
const userApi = require("./routes/userRoute");

app.use("/todo/api", todoApi);
app.use('/user/api', userApi);

app.listen(port, () => console.log(`Server Start at Port ${port}`));
