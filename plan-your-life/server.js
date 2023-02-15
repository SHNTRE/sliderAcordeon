var http = require('http');
var pylApi = require('./Server/PlanYourLife-API/plan-your-life-api');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express()

app.use(bodyParser.json());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.all('/', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "X-Requested-With");
  next();
});

app.use(cors(corsOptions));

app.use('/api', pylApi);

app.get('*', function(req,res){});

const port = process.env.PORT || 8000

app.set('port', port);
const server = http.createServer(app);

app.listen(port, ()=>{console.log('Server initialized and running on port ' + port)});
