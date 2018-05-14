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
    console.log("connected as id "+ connection.threadid + "\n");

});

function displayProducts(){
    connection.query("SELECT name FROM products", function (err, res){
        if(err) throw err;
        
        console.log(res);
        connection.end();
    });
}

displayProducts();

