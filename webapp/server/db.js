const { Pool } = require("pg");
const pool = new Pool({
  user: "thirunai",
  password: "",
  host: "localhost",
  database: "lightbnb",
});

module.exports = pool;