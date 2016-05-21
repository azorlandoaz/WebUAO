
console.log('Servidor Reto');

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8082;
var path    = require("path");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('Public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Public/Views/Login.html'));
});

var service = require('./service.js');

app.get('/create/:collection/:v1/:v2',service.create);
app.get('/createRegistro/:collection/:v1/:v2/:v3',service.createRegistro);
app.get('/read/:collection',service.read);
app.get('/read/:collection/:param',service.readX);
app.get('/readUsuario/:param/:value',service.readUsuario);
app.get('/update/:collection/:v1/:v2/:id',service.update);
app.get('/delete/:collection/:param/:value',service.delete);
app.post('/', service.post);

//app.listen(port);
http.createServer(app).listen(port);
console.log("Servidor activo por el puerto " + port);
