var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 4200);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let distDir = path.join(__dirname + '/dist/');

app.use(express.static(distDir));

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
