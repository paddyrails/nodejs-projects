var mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"password",
  database: "tradingbooks"
});

connection.connect(function(err){
  if(err){
    console.log("err");
  }
  console.log("connection successful!");
});

/*async() => {
  try{
    await connection.connect();
  }catch(err){
    console.log(err);
  }
  console.log("SQL connection successful!");
}*/


module.exports = connection;
