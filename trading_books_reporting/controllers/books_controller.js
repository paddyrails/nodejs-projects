var fs =  require('fs');
var con = require('../db.js');

exports.getBooks = function(req, res) {
    /***********FROM FILE **********************
    var contents = JSON.parse(fs.readFileSync('./data/books.json', 'utf8'));
    res.json(contents.Books)*/
    /****** FROM MYSQL **********/
    let query = 'SELECT t.idtradingbook,t.name,t.description,(Select u.lastname from user u where u.iduser = t.managedbyuser) as user FROM tradingbook t';
    con.query(query, function(err, result, fields){
      if(err) throw err;
      res.json(result);
    });

}

exports.getBook = function(req, res) {
    /**********FROM FILE *******************
    var contents = JSON.parse(fs.readFileSync('./data/books.json', 'utf8'));
    var book = contents.Books.filter(book => book.id === parseInt(req.params['bookid']));
    res.json(book[0]);***********************/

    /****************FROM MYSQL***************/
    let bookid = req.params['bookid'];
    let query = `SELECT t.idtradingbook,t.name,t.description,(Select u.lastname from user u where u.iduser = t.managedbyuser) as user FROM tradingbook t where t.idtradingbook= ${bookid}`;
    con.query(query, function(err, result, fields){
      if(err) throw err;
      res.json(result);
    })

    //res.send();
}
