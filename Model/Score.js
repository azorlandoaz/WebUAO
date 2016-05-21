var Schema = require('mongoose').Schema;

var Score = new Schema
({
	idEnrollment: { type: Schema.ObjectId, ref: "Enrollment" },
	idUser: { type: Schema.ObjectId, ref: "User" },
	section: { type:String, required:true, maxlength: 1},
	score: { type:String, required:true, maxlength: 3}
});

module.exports = Score;