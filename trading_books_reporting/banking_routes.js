var express = require('express');
module.exports = function(app) {
  var customers = require('./controllers/customers_controller');
  var books = require('./controllers/books_controller');
  var transactions = require('./controllers/transactions_controller');
  var portfolios = require('./controllers/portfolios_controller');
  app.use('/static', express.static( './static'));
      //use('/images', express.static( '../images')).
      //use('/lib', express.static( '../lib')

  var isAuthorized = function (req, res, next) {
    console.log(req.session.Authorized);
    if(req.session.Authorized !== null && (req.session.Authorized === true || req.session.Authorized === false)){
        //console.log("present in Session")
        //console.log(req.session.Authorized);
    }else{
        //console.log("generate");
        //RBAC https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1

        /* https://github.com/gheeres/node-activedirectory
        var ActiveDirectory = require('activedirectory');
        var config = { url: 'ldap://dc.domain.com',
                       baseDN: 'dc=domain,dc=com',
                       username: 'username@domain.com',
                       password: 'password' }

        var username = 'user@domain.com';
        var groupName = 'Employees';

        var ad = new ActiveDirectory(config);
        var ad.isUserMemberOf(username, groupName, function(err, isMember) {
          if (err) {
            console.log('ERROR: ' +JSON.stringify(err));
            return;
          }

          console.log(username + ' isMemberOf ' + groupName + ': ' + isMember);
        });

        */
        if(false){
            //req.session.regenerate(function(){
                    req.session.user = "paddy";
                    req.session.username = "paddy123";
                    req.session.Authorized = true;
                    req.session.msg = 'Authorized as ' + "paddy";
              //    });
        }else{
            //req.session.regenerate(function(){
                req.session.Authorized = false;
                err = 'user not Found!';
                req.session.error = err;
            //});
        }
    }
    next();
  }

  app.use(isAuthorized);

  app.get('/', function(req, res){
    res.render('welcome');
  });
  app.get('/searchBooks', function(req, res){
    res.render('books');
  });
  app.get('/uploadbooks', function(req, res){
    res.render('uploadbooks');
  });
  app.post('/fileUpload', function(req, res){
    console.log(req);
    let imageFile = req.files.file;

    console.log(imageFile);
    res.send("success");

  })



  app.get('/books', books.getBooks);
  app.get('/customers', customers.getCustomers);
  //app.get('/customers/:bookid', customers.getCustomersForBook);
  app.get('/customers/:customerid', customers.getCustomer);
  app.get('/books/:bookid', books.getBook);
  app.get('/portfolios/:bookid', portfolios.getPortfoliosForBook1);
  app.get('/transactions', transactions.getTransactions);
  app.get('/transactions/:bookid', transactions.getTransactionsForBook);
  app.get('/insert', transactions.bulkInsert);

}
