/** Exercise 03 - Form **/

// Add your code here
var http = require('http');
var fs = require('fs');

const PORT=8080; 

fs.readFile('./03-form.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});
