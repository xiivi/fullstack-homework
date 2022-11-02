const http = require('http');

const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  } 

  
  else if (req.url.indexOf('/attributes') >= 0){
    let routeResults = getRoutes();
    const table = createTableHTML(req.url);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>hello world & lorem ipsum</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(table);
  }

  else if (req.url.indexOf('/items') >= 0){
    let routeResults = getRoutes();
    const table = createTableHTML(req.url);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>hello world & lorem ipsum</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(table);
  }

  else if (req.url.indexOf('/characters') >= 0){
    let routeResults = getRoutes();
    const table = createTableHTML(req.url);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>hello world & lorem ipsum</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.write(table);
  }

  function createTableHTML (url) {
    let dataset = parsedDataFromURL(url);
    let results = "";

    results += `<table border=1px>`;
      dataset.forEach(
        row => {
              results += `<tr>`
                row.forEach(
                  data => results += `<td>${data}</td>`
                ),

              results += `</tr>`
        }
      )
    results += `</table>`;

    return results;
  } 

  function parsedDataFromURL (url) {
    let parsedURL = url.split("?");
    let temp1 = parsedURL[1];
    let parsedArgs = temp1.split("&");

    let results = [];
    let temp = [];

    // [1=1, 2=2...]
    parsedArgs.forEach(
      arg => results.push(arg.split("="))
    )

    return results;
  }
  

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
