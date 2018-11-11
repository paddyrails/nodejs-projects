var fs =  require('fs');
var con = require('../db.js');

exports.getTransactions = function(req, res) {
    /***********FROM FILE **********************
    var contents = JSON.parse(fs.readFileSync('./data/values.json', 'utf8'));
    res.json(contents.values)
      /****** FROM MYSQL **********/
      let query = 'SELECT t.idtransaction,t.transaction_value,t.transaction_date, t.status, \
                  (Select c.lastname from customer c where c.idcustomer = t.customer) as customer, \
                  (Select p.name from transaction_type p where p.idtransaction_type = t.transaction_type) as transaction_type, \
                  (Select f.name from financial_instrument f where f.idfinancial_instrument = t.financial_instrument) as financial_instrument \
                  FROM transaction t';
      //let query = 'SELECT * FROM transaction';
      con.query(query, function(err, result, fields){
        if(err) throw err;
        res.json(result);
      });

}

exports.getTransactionsForBook = function(req, res) {
  /***********FROM FILE **********************
    var contents = JSON.parse(fs.readFileSync('./data/values.json', 'utf8'));
    var values = contents.values.filter(value => value.book === parseInt(req.params['bookid']));
    res.json(values);
  /****** FROM MYSQL **********/
  let bookid = req.params['bookid'];
  let query = `SELECT t.idtransaction,t.transaction_value,t.transaction_date, t.status, \
              (Select c.lastname from customer c where c.idcustomer = t.customer) as customer, \
              (Select p.name from transaction_type p where p.idtransaction_type = t.transaction_type) as transaction_type, \
              (Select f.name from financial_instrument f where f.idfinancial_instrument = t.financial_instrument) as financial_instrument \
              FROM transaction t where t.portfolio in (Select idportfolio from portfolio_book_association where tradingbook = ${bookid})`;

  con.query(query, function(err, result, fields){
    if(err) throw err;
    res.json('{}');
  })

}

exports.bulkInsert = function(req, res) {

  let query = 'BULK INSERT Sales.Orders \
              FROM "C:\\Users\\Owner\\Desktop\\databases\\transaction.csv"';
  con.query(query, function(err, result, fields){
    if(err) throw err;
    res.json(result);
  });

}
