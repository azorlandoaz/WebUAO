var mongoose = require('mongoose'),
db_url = 'localhost/WebUAO';
db = mongoose.createConnection(db_url);


var schema_User = require('./Model/User.js');
User = db.model('User', schema_User);

var schema_Registro = require('./Model/Registro.js');
Registro = db.model('Registro', schema_Registro);

var schema_Enrollment = require('./Model/Enrollment.js');
Enrollment = db.model('Enrollment', schema_Enrollment);

var schema_Score = require('./Model/Score.js');
Score = db.model('Score', schema_Score);

var schema_Subject = require('./Model/Subject.js');
Subject = db.model('Subject', schema_Subject);

console.log((db));
module.exports=db;
module.exports=mongoose;