const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Reference to index.html is performed here
// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/submit', (req, res) => {
  const name = req.body.name === '' ? 'N/A' : req.body.name;
  const email = req.body.email === '' ? 'N/A' : req.body.email;
  const comment = req.body.comment === '' ? 'N/A' : req.body.comment;
  const newsletter = req.body.newsletter === undefined ? 'No, do not sign me up' : 'Yes, sign me up';

  res.status(200);
  res.set({'Content-type': 'text/html'});

  res.write(`<h1>Name: ${name}</h1>`);  
  res.write(`<h1>Email: ${email}</h1>`);  
  res.write(`<h1>Comments: ${comment}</h1>`);
  res.write(`<h1>Newsletter: ${newsletter}</h1>`);
  res.end(); 

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
