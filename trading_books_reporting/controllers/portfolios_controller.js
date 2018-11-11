var fs =  require('fs');
var con = require('../db.js');

/*exports.getPortfolios = function(req, res) {
    /***********FROM FILE **********************
    var contents = JSON.parse(fs.readFileSync('./data/books.json', 'utf8'));
    res.json(contents.Books)*/
    /****** FROM MYSQL **********
    let query = 'SELECT t.idtradingbook,t.name,t.description,(Select u.lastname from user u where u.iduser = t.managedbyuser) as user FROM tradingbook t';
    con.query(query, function(err, result, fields){
      if(err) throw err;
      res.json(result);
    });

}*/

exports.getPortfoliosForBook = function(req, res) {

    let bookid = req.params['bookid'];
    let query = `Select idportfolio, managedbyuser, name, description from portfolio \
                  where idportfolio in (SELECT idportfolio from portfolio_book_association where tradingbook = ${bookid})`;

    con.query(query, function(err, result, fields){
      if(err) throw err;
      res.json('{}');
    })

    //res.send();
}

function getData(query){
  return  new Promise(function(resolve, reject){
    con.query(query, function(err, result, fields){
      if(err){
        reject(err);
      } else {
        resolve(result)
      }
    });
  });

}


exports.getPortfoliosForBook1 = function(req, res) {

    let bookid = req.params['bookid'];
    let query = `Select idportfolio, managedbyuser, name, description from portfolio \
                  where idportfolio in (SELECT idportfolio from portfolio_book_association where tradingbook = ${bookid})`;

    let dataPromise = getData(query);

    dataPromise.then(function(result){
                res.json(result)
              }, function(err){
                console.log(err);
              });
  }
