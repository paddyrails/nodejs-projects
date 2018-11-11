var fs = require('fs');
var contents = JSON.parse(fs.readFileSync('./data/values.json', 'utf8'));
var values = contents.values.filter(value => value.book === 9);
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthValue = values.map(value => ((months[(new Date(value.date)).getMonth()] + " " + (new Date(value.date)).getFullYear())));
var uSet = new Set(monthValue);
console.log([...uSet])


var request = require("request");
var userDetails;

function getData(url) {
    // Setting URL and headers for request
    var options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise
    return new Promise(function(resolve, reject) {
        // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

var errHandler = function(err) {
    console.log(err);
}

function main() {
    var userProfileURL = "https://api.github.com/users/narenaryan";
    var dataPromise = getData(userProfileURL);
    // Get user details after that get followers from URL
    dataPromise.then(JSON.parse, errHandler)
               .then(function(result) {
                    userDetails = result;
                    // Do one more async operation here
                    var anotherPromise = getData(userDetails.followers_url).then(JSON.parse);
                    return anotherPromise;
                }, errHandler)
                .then(function(data) {
                    console.log(data)
                }, errHandler);
}


main();


/*
var fs = require('fs');
var contents = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
    var customer = contents.Customers.filter(customer => customer.Name.toLowerCase() === ("WeePn").toLowerCase());
    console.log(customer);



/*
var fs = require('fs');
var stream = fs.createWriteStream("/Users/padmanabhanpillai/Banking/my_file.txt");
var d = new Date(); // Today!
//d.setDate(; // Yesterday!


stream.once('open', function(fd) {

  for(var i=350; i>0; i--){
    for(var j=0; j<10; j++){
    stream.write("{ \"book\": " + Math.floor(Math.random()*10) +
                 ", \"date\": " + String(d - i) +
                 ", \"value\": " + Math.floor(Math.random()*10000) + "},\n")
    }
  }

  stream.end();
});


//Random generator
/*
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


var arrCities = ["Charlotte","Seattle","Chicago", "New York", "Charleston", "Mumbai", "Nashville","Miami"]
var arrNet = [10000, 160000, 76000, 85000, 123142, 85000, 120000, 46000, 180000, 92000]


for(var i=0; i<100; i++){
    console.log( "{ \"Name\": \"" + makeid() +
                    "\",\"Location\": \"" + arrCities[Math.floor(Math.random()*arrCities.length)] +
                    "\", \"Opportunity\": " + arrNet[Math.floor(Math.random()*arrNet.length)] +
                    "\", \"Book\": " + Math.floor(Math.random()*10) +
                    " },")
}*/
