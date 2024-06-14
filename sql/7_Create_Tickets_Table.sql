USE starlux;
CREATE TABLE ticket (
    ticket_id INT PRIMARY KEY,
    passenger_name VARCHAR(255),
    passport_number VARCHAR(255),
    travel_date DATE,
    flight_id INT,
    seat_number VARCHAR(255),
    ticket_status VARCHAR(255),
    FOREIGN KEY (flight_id) REFERENCES flight(flight_id)
);