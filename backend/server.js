const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});
const app = require("./app.js");
app.listen(3000, () => {
  console.log("running");
});
