var express = require('express');
var app = express();

const PORT = 8080;

app.use('/static', express.static('../..' + '/css'));
app.use('/static', express.static('../..' + '/image'));
app.use('/static', express.static('..' + '/lib'));
app.use('/static', express.static('../..' + '/src'));

app.get('/', function(req, res) {
  res.sendFile('/index.html', {root: '..' });
});

app.listen(PORT);

console.log('Сервер стартовал!');