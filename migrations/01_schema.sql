-- Active: 1670959620127@@127.0.0.1@5432@lightbnb@public
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
    );

CREATE TABLE
    properties (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        cost_per_night INTEGER,
        parking_spaces INTEGER,
        number_of_bathrooms INTEGER,
        number_of_bedrooms INTEGER,
        thumbnail_url VARCHAR(255),
        cover_photo_url VARCHAR(255),
        street VARCHAR(255),
        city VARCHAR(255),
        province VARCHAR(255),
        post_code VARCHAR(255),
        country VARCHAR(255),
        active BOOLEAN,
        owner_id INT REFERENCES users(id)
    );

CREATE TABLE
    reservations (
        id SERIAL PRIMARY KEY,
        start_date DATE,
        end_date DATE,
        guest_id INT REFERENCES users(id),
        property_id INT REFERENCES properties(id)
    );

CREATE TABLE
    property_reviews (
        id SERIAL PRIMARY KEY,
        message TEXT,
        rating INT,
        guest_id INT REFERENCES users(id),
        property_id INT REFERENCES properties(id),
        reservation_id INT REFERENCES reservations(id)
    );

