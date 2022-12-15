-- Active: 1670959620127@@127.0.0.1@5432
-- User Login

SELECT * FROM users WHERE email = 'tristanjacobs@gmail.com';

-- Average Length Of Reservation

SELECT
    avg(end_date - start_date) AS average_duration
FROM reservations;

-- Property Listings by City

SELECT
    properties.id as id,
    properties.title as title,
    properties.city AS city,
    properties.cost_per_night as cost_per_night,
    avg(property_reviews.rating) AS "average_rating"
FROM properties
    JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE city LIKE '%Vancouver%'
GROUP BY properties.id
HAVING
    avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;

-- Most Visted Cities

SELECT
    properties.city as city,
    count(reservations.*) AS total_reservations
FROM reservations
    JOIN properties ON property_id = properties.id
GROUP BY properties.city
ORDER BY
    total_reservations DESC;

-- All My Reservations

SELECT
    reservations.guest_id,
    reservations.id as id,
    properties.title as title,
    properties.cost_per_night as cost_per_night,
    reservations.start_date as start_date,
    avg(property_reviews.rating)
FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    JOIN property_reviews ON property_reviews.property_id = properties.id -- JOIN users ON user.id = guest_id
WHERE reservations.guest_id = 1
GROUP BY
    properties.id,
    reservations.id;

ORDER BY reservations.start_date LIMIT 10;