var Schema = require('mongoose').Schema;

var Enrollment = new Schema
({
	idSubject: { type: Schema.ObjectId, ref: "Subject" },
	idUser: { type: Schema.ObjectId, ref: "User" }
});

module.exports = Enrollment;