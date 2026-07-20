require("dotenv").config();

const app = require("./src/app");
const pool = require("./src/db/db");

pool
  .connect()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
