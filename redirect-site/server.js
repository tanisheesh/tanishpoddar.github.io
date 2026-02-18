const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Redirect all requests to new domain
  res.writeHead(301, {
    'Location': 'https://tanisheesh.is-a.dev' + req.url
  });
  res.end();
});

server.listen(PORT, () => {
  console.log(`Redirect server running on port ${PORT}`);
});
