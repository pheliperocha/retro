var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 8080);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var distDir = __dirname + "/dist/";

app.use(express.static(distDir));

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
