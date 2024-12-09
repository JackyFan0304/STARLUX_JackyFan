USE starlux;
INSERT INTO flight (flight_id, flight_number, departure_city, destination_city, departure_date, arrival_date, departure_time, arrival_time, airline, flight_status)
VALUES
    (1, 'SL123', 'Taipei', 'Hong Kong', '2024-06-15', '2024-06-15', '08:00:00', '10:00:00', 'StarLux', 'Scheduled'),
    (2, 'SL456', 'Hong Kong', 'Tokyo', '2024-06-16', '2024-06-16', '14:00:00', '16:00:00', 'StarLux', 'Scheduled'),
    (3, 'SL789', 'Tokyo', 'Seoul', '2024-06-17', '2024-06-17', '08:00:00', '10:00:00', 'StarLux', 'Scheduled'),
    (4, 'SL012', 'Seoul', 'Taipei', '2024-06-18', '2024-06-18', '14:00:00', '16:00:00', 'StarLux', 'Scheduled'),
    (5, 'SL345', 'Hong Kong', 'Singapore', '2024-06-19', '2024-06-19', '08:00:00', '10:00:00', 'StarLux', 'Scheduled');