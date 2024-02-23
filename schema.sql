CREATE TABLE IF NOT EXISTS tbl_beer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    beer_name VARCHAR(45) NOT NULL,
    beer_type VARCHAR(45),
    flavors VARCHAR(45),
    alcohol_per VARCHAR(45),
    price VARCHAR(45),
    bar VARCHAR(45),
    comments VARCHAR(45)
);