//npm package
var mysql = require("mysql");
var inquirer = require('inquirer');



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:  "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function(error){
    if (error) throw error;
    console.log("connected as id "+ connection.threadId + "\n");

});

//pull the products.  
function displayProducts(){
    connection.query("select item_id, product_name, department_name, price, stock_quantity from products", function (error, response){
        if(error) throw error;
        
        console.log(response);
        connection.end();
    });
}

//call the function to display the 
displayProducts();

