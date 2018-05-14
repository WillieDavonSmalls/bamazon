CREATE DATABASE bamazon; 

use bamazon; 

create table products(
	item_id int NOT NULL AUTO_INCREMENT,
	product_name varchar(100) not null,
    department_name varchar(100) not null,
    price decimal(8,2) not null,
    stock_quantity integer not null,
    PRIMARY KEY (item_id)
);
