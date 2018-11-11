var fs =  require('fs');
var con = require('../db.js');

exports.getCustomers = function(req, res) {
      /***********FROM FILE **********************
    if(req.session.Authorized){
        var contents = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
        res.json(contents.Customers)
    }else{
        res.json({"message":"Unauthorized"})
    }
      /****** FROM MYSQL **********/
    let query = 'SELECT c.idcustomer,c.firstname,c.lastname,c.businessname,(Select u.name from customer_type u where u.idcustomer_type = c.customertype) as user FROM customer c';
    con.query(query, function(err, result, fields){
      if(err) throw err;
      res.json(result);
    });


}

exports.getCustomer = function(req, res) {
  /***********FROM FILE **********************
    var contents = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
    var customer = contents.Customers.filter(customer => customer.Name.toLowerCase() === req.params['customername'].toLowerCase());
    res.json(customer[0]);
    /****** FROM MYSQL **********/
    let customerid = req.params['customerid'];
    let query = `SELECT c.idcustomer,c.firstname,c.lastname,c.businessname,(Select u.name from customer_type u where u.idcustomer_type = c.customertype) as user FROM customer c where c.idcustomer = ${customerid}`;
    con.query(query, function(err, result, fields){
      if(err) throw err;
      res.json(result);
    });
}

exports.getCustomersForBook = function(req, res) {
  /***********FROM FILE **********************
    var contents = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
    var customers = contents.Customers.filter(customer => customer.Book === parseInt(req.params['bookid']));
    res.json(customers);
      /****** FROM MYSQL **********/
}
