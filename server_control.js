console.log('Servidor Back - Reto 2');

var http = require('http');
var express = require('express');
var app = express();
var port = 8080;


var General_Service = require('./service.js');
var User_Service = require('./service_user.js');
var Registro_Service = require('./service_registro.js');
var Enrollment_Service = require('./service_Enrollment.js');
var Score_Service = require('./service_score.js');
var Subject_Service = require('./service_subject.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/create/:collection/:v1/:v2/:v3/:v4/:v5',General_Service.create);
app.get('/read/:collection',General_Service.read);
app.get('/read/:collection/:param',General_Service.readX);
app.get('/update/:collection/:v1/:v2/:id',General_Service.update);
app.get('/delete/:collection/:param/:value',General_Service.delete);
app.post('/', General_Service.post);

app.get('/createRegistro/:collection/:v1/:v2/:v3',Registro_Service.createRegistro);

app.get('/readUser/:param/:value',User_Service.readUsuario);
app.get('/readUser/:param',User_Service.readUsuarioByName);
app.get('/createUser/:v1/:v2/:v3',User_Service.createUsuario);

app.get('/createEnrollment/:collection/:v1/:v2',Enrollment_Service.create);
app.get('/readEnrollment/:collection',Enrollment_Service.read);
app.get('/EnrollmentReadX/:collection/:param/:value', Enrollment_Service.readX);

app.get('/ScoreCreate/:collection/:v1/:v2/:v3/:v4', Score_Service.create);
app.get('/ScoreRead/:collection', Score_Service.read);
app.get('/ScoreReadX/:collection/:param/:value', Score_Service.readX);

app.get('/CreateSubject/:collection/:v1/:v2/:v3/:v4/:v5', Subject_Service.create);
app.get('/ReadSubject/:collection', Subject_Service.read);
app.get('/SubjectReadX/:collection/:param/:value', Subject_Service.readX);

http.createServer(app).listen(port);
console.log("Servidor activo por el puerto " + port);