/** Exercise 04 - API **/

const url = 'https://restcountries.com/v3.1/all';

// Add your code here

var http = require('http');
var fs = require('fs');

const PORT=8080; 

fs.readFile('./04-api.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});
