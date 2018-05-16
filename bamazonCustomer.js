//npm package
var mysql = require("promise-mysql");

var inquirer = require('inquirer');



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:  "root",

    password: "password",
    database: "bamazon"
});


//pull the products.  
function displayProducts(){
    return connection.then(function(con) {
        var sqlQuery
        return con.query("select item_id, product_name, department_name, price, stock_quantity from products");
    })
    .then(function(rows) {
        console.log("Rows: ", rows);
    });
}

//call the function to display the 
displayProducts();


var units;
var current_unit;
var updated_units;

function currentUnits (item_id){
    return connection.then(function(con) {

        var sqlQueryy = {
            sql: "select stock_quantity from products where item_id = ?",
            values: [ item_id ]
        };
        return con.query(sqlQuery); //this returns the promise, which is the result of the query
    })
    .then(function (response){
        
        console.log(response);
        current_unit = response[0].stock_quantity;

    });
}

currentUnits(1).then(function() {
    console.log(current_unit);
});

