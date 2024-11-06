const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(port, function () {
  console.log("App Listen on port >> " + port);
});