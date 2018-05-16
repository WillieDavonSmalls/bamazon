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

insert into products (product_name, department_name, price, stock_quantity) VALUES
('blackberries', 'produce', 5.00, 10), ('strawberries', 'produce', 3.00, 20), ('raspberries', 'produce', 5.00, 10), ('carrots', 'produce', 2.00, 20), ('arugula', 'produce', 5.00, 5), 
('scallops', 'fish', 25.00, 10), ('clams', 'fish', 8.00, 10), ('trout', 'fish', 20.00, 10), ('ribeye', 'meat', 15.00, 10), ('chicken', 'meat', 12.00, 10)


SET @item_id = 1;
SET @units = 20; 
SET @units_left = NULL;
SET @units_available = NULL;  
SET @update_table = 0; 

SELECT @units_available := stock_quantity FROM products WHERE item_id = @item_id;

SELECT @units_left := stock_quantity FROM products WHERE item_id = @item_id;

SET @units_left := @units_left - @units;

SELECT @units, @item_id, @units_available, @units_left;



UPDATE products SET stock_quantity = if(@units_left >= 0, @units_left, @units_available) 
WHERE item_id = @item_id;

SET @update_table = if(@units_left >= 0, 1, 0) 



  

DELIMITER //
CREATE PROCEDURE purchase_items
(in item_id int,
in units int, 
out update_table int)
BEGIN

	SET @units_left = item_id;
	SET @units_available = units;  
	SET @update_table = 0; 
	SELECT @units_available := stock_quantity FROM products WHERE item_id = @item_id;

	SELECT @units_left := stock_quantity FROM products WHERE item_id = @item_id;

	SET @units_left := @units_left - @units;

	SELECT @units, @item_id, @units_available, @units_left;


	UPDATE products SET stock_quantity = if(@units_left >= 0, @units_left, @units_available) 
	WHERE item_id = @item_id;

	SET @update_table = if(@units_left >= 0, 1, 0); 

END

SET @update_table = 0;  
CALL `bamazon`.`purchase_items`(1, 1, @update_table);

select* from products