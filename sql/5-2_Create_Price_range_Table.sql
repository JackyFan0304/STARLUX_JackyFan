USE starlux;
CREATE TABLE price_range (
    price_range_id INT PRIMARY KEY,
    cabin_class_id INT,
    price DECIMAL (10,2),
    FOREIGN KEY (cabin_class_id) REFERENCES cabin_class(cabin_class_id)
);


