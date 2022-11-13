const http = require('http');

const port = process.env.PORT || 5000;

const formHTML = `<html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>03 - Form</title>
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
              />

            </head>
            <body class="bg-dark">
              <form class="bg-light border rounded w-50 mx-auto mt-5 p-3" method='post' action="/submit">
                <h1 class="mt-2 mb-4">Contact Form</h1>
                <h6>Name *</h6>
                <input type="name" name="name" class="form-control" aria-label="name" id="inputname" aria-describedby="basic-addon1">
                <h6>Email *</h6>
                <input type="email" name="email" class="form-control" aria-label="email" id="inputemail" aria-describedby="basic-addon1">
                <h6>Submit your message:</h6>
                <textarea type="comment" name="comment" class="form-control" aria-label="msgsubmission" id="inputcomment"></textarea>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="newsletter" id="newsletterCheckbox" checked>
                  <label class="form-check-label" for="flexCheckChecked">
                    Sign up the newsletter
                  </label>
                </div>

                <br>
                <button type="submit" class="btn btn-primary btn-lg btn-block" >Submit</button>
                </div>
              </form>
            </body>
          </html>`



const server = http.createServer((req, res) => {
  const routes = [
    '/form',
    '/submit'
  ];

  let body = "";
  
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

  req.on("data", (chunk) => {
    body += chunk;
    console.log("on data: " + body);
  });


  req.on("end", () => {
  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
  } 

  else if (req.url === '/form') {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.write(formHTML);
  }

  else if (req.url === '/submit') {
    const params = new URLSearchParams(body);

    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.write(`<h2>Name: ${params.get("name")}</h2>`);
    res.write(`<h2>Email: ${params.get("email")}</h2>`);
    res.write(`<h2>Comments: ${params.get("comment")}</h2>`);

    if( params.get("newsletter") ){
      res.write(`<h2> Newsletter: Yes, sign me up for the newsletter.</h2>`);
    } else {
      res.write(`<h2> Newsletter: No, thank you.</h2>`);
    }
  }

  res.end();
  })
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

