const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5000;

// Global variables
let pathHistory = [];

function addPath(path){
  if(path.includes('/favicon.ico') === true){
    return; 
  }
  else if(pathHistory.includes(path) === false){
    pathHistory.push(path); 
  }
  return;
}

function displayPath(path){
  if(pathHistory.length === 0 || pathHistory.length === 1 && pathHistory.includes(path)){
    return `Welcome to http://localhost:5000${path}`;
  } else {
    let toDisplay = `<p>Previously visited:</p>`;
    pathHistory.forEach((subPath, i) => {
      toDisplay += `<ul>${subPath}</ul>`;
   }) 
    return toDisplay;
  }

  return;
}

// Use the express-session module
app.use(
  session({
    secret: 'secret code',
    resave: 'false',
    saveUninitialized: false,
  })
);

app.get('/*', (req, res) => {
   const path = req.url;

   res.status(200);
   res.set({'Content-type': 'text/html'});
   res.write(`<p>Currently on route: ${path}</p>`);
   res.write(displayPath(path));
   res.end();

   addPath(path);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
