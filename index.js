const { createServer } = require('node:http');
const fs = require('node:fs');

const server = createServer((req, res) => {
  console.log(req.url)
  let url = req.url.slice(1);
  console.log("url", url)

  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
      return
    });
  } else if (url) {
    fs.readFile(`${url}.html`, (err, data) => {
      if (err) {
        error404(err, res);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
      return
    });
  } 
});

function error404(err, res) {
  fs.readFile('404.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(err.message);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(data);
});
};

server.listen(6500);