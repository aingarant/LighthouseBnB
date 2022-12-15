const pool = require("./db");

const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  const values = [id];

  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addUser = function (user) {
  const { name, email, password } = user;

  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, password];

  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAllReservations = function (guestId, limit = 10) {
  const values = [guestId, limit];
  const queryString =
    "SELECT * FROM reservations WHERE guest_id = $1 ORDER BY id LIMIT $2";
  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getAllProperties = function (options, limit = 10) {
  const values = [limit];
  const queryString = "SELECT * FROM properties LIMIT $1";
  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const addProperty = function (property) {
  const {
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
  } = property;

  const queryString =
    "INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,street,city,province,  post_code,country,parking_spaces,number_of_bathrooms,number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *";

  const values = [
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
  ];

  return pool
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((error) => error);
};

module.exports = {
  addProperty,
  getAllProperties,
  getAllReservations,
  addUser,
  getUserWithId,
  getUserWithEmail,
};
