CREATE DATABASE IF NOT EXISTS beer_db;
USE beer_db;
CREATE TABLE IF NOT EXISTS tbl_beer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    beer_name VARCHAR(45) NOT NULL,
    beer_type VARCHAR(45) DEFAULT NULL,
    flavors VARCHAR(45) DEFAULT NULL,
    abv VARCHAR(45) DEFAULT NULL,
    ibu VARCHAR(45) DEFAULT NULL,
    brewery VARCHAR(45) DEFAULT NULL,
    comments VARCHAR(45) DEFAULT NULL,
    info MEDIUMTEXT DEFAULT NULL,
    photo BLOB DEFAULT NULL
);
INSERT INTO `beer_db`.`tbl_beer` (`beer_name`, `beer_type`, `flavors`, `abv`, `ibu`, `brewery`) VALUES ('Pacaya Chocolate Stout', 'Stout', 'chocolate,vainilla', '6.5', '30', 'Quetzal Brewing Company');
INSERT INTO `beer_db`.`tbl_beer` (`beer_name`, `beer_type`, `flavors`, `abv`, `ibu`, `brewery`) VALUES ('Barrilete IPA', 'Indian Pale Ale', 'citrico,frutal', '6', '50', 'Quetzal Brewing Company');
