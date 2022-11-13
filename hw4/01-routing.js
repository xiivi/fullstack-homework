const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get('/', (req, res) => {
  let routeResults = getRoutes();

  res.status(200);
  res.set({'Content-Type': 'text/html'});
  res.send(`<h1>Exercise 04 - Root Page</h1>
            <ul> ${routeResults} </ul>`);
  //res.send(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get('/welcome', (req, res) => {

  res.send('GET request to the welcome page');
});

app.get('/redirect', (req, res, next) => {

  console.log("Redirecting to /redirect");
  res.status(302);
  res.redirect('/redirected');
  next();
})

app.get('/redirected', (req, res) => {

  res.status(200);
  res.set({'Content-Type': 'text/html'});
  res.send("ur in /redirected");
  res.end();
})

app.get('/cache', (req, res, next) => {
  let MAXAGE = 86400;
  res.set('Cache-Control', `public, max-age=${MAXAGE}`)
  res.send("this resource was cached btw");
  res.end();
  next();
})

app.get('/cookie', (req, res, next) =>{
  res.set('Cookie', `hello=world`)
  res.send("yum COOKIES!!!");
  res.end();
  next();
})

app.get('*', (req, res, next) => {
  res.send("404 error. where do u think ur going???", 404); 
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
