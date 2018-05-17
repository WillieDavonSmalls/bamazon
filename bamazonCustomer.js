//npm packages
var mysql = require("mysql");
var inquirer = require('inquirer');

//connection string
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user:  "root",

    password: "password",
    database: "bamazon"
});

//create connection
connection.connect(function(error){
    if (error) throw error;
    //console.log("connected as id "+ connection.threadId + "\n");

});

//questions for bamazon users
var questions = [
 
    {
      type: 'input',
      name: 'itemId',
      message: 'What is item id interests you?',
      validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    },
    {
      type: 'input',
      name: 'numUnits',
      message: 'How many units?',
      validate: function(value) {
        var valid = !isNaN(parseFloat(value));
        return valid || 'Please enter a number';
      },
      filter: Number
    }
  ];


//pull the products.  
function displayProducts(){
    connection.query("select item_id, product_name, department_name, price, stock_quantity from products", function (error, response){
        if(error) throw error;

        console.log(response);
        //connection.end();
    });
}


//Primary SQL queries
var sqlQuery = "SELECT product_name, price, stock_quantity FROM products WHERE item_id = ?"
var sqlUpdate = "UPDATE products SET stock_quantity = ? WHERE item_id = ?"


function currentUnits(item_id, units){

//SQL query to pull data 
connection.query(sqlQuery, [item_id], function (error, response){
    var current_units;
    var price;
    var remaining_units; 
    var product_name; 

    if(error) throw error;
    
    current_units = response[0].stock_quantity;
    price = response[0].price;

    if (current_units >= units){
        remaining_units = current_units - units; 
        connection.query(sqlUpdate, [remaining_units, item_id], function(error, response){
            if(error) throw error;
        });
        console.log('The Price For ' + units + ' of ' + response[0].product_name + ' is ' + '$' + price * units);
    } 
    else{
        console.log('Insufficient quantity!');
    } 
    connection.end();
});
}
  
//display the products
displayProducts();

inquirer.prompt(questions).then(answers => {
//run function for inquire and SQL
currentUnits(answers.itemId, answers.numUnits);
});

