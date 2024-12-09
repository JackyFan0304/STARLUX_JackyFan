USE starlux;
CREATE TABLE flight (
    flight_id INT PRIMARY KEY,
    flight_number VARCHAR(255),
    departure_city VARCHAR(255),
    destination_city VARCHAR(255),
    departure_date DATE,
    arrival_date DATE,
    departure_time TIME,
    arrival_time TIME,
    airline VARCHAR(255),
    flight_status VARCHAR(255),
	cabin_class VARCHAR(255),
	price DECIMAL (10,2)
);