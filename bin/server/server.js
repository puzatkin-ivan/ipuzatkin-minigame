var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.sendFile('/index.html', { root: "../" });
});

app.listen(8080);

console.log('Сервер стартовал!');