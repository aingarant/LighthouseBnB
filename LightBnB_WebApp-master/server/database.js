const pool = require("./db");

const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  const user = pool
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((error) => {
      return Promise.reject(null);
    });
  return Promise.resolve(user);
};

const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  const values = [id];

  const user = pool
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((error) => null);
  return Promise.resolve(user);
};

const addUser = function (name, email, password) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, password];

  const newUser = pool
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((error) => null);

  return Promise.resolve(newUser);
};

const getAllReservations = function (guest_id, limit = 10) {
  return getAllProperties(null, 2);
};

const getAllProperties = function (options, limit = 5) {
  const values = [limit];
  const queryString = "SELECT * FROM properties LIMIT $1";
  const properties = pool
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((error) => error);

  return Promise.resolve(properties);
};

const addProperty = function (property) {
  return Promise.resolve(property);
};

module.exports = {
  addProperty,
  getAllProperties,
  getAllReservations,
  addUser,
  getUserWithId,
  getUserWithEmail,
};
