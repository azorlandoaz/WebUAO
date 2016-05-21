var Schema = require('mongoose').Schema;

var User = new Schema
({
	username: { type:String, required:true, maxlength: 30},
	password: { type:String, required:true, maxlength:30},
	type: {type:String, required:true, maxlength:30}
});

module.exports = User;