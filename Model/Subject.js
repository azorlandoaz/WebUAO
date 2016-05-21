var Schema = require('mongoose').Schema;

var Subject = new Schema
({
	name: { type:String, required:true, maxlength: 30},
	teacher: { type:String, required:true, maxlength:30},
	group: {type:String, required:true, maxlength:30},
	day: {type:String, required:true, maxlength:30},
	hour: {type:String, required:true, maxlength:30}
});

module.exports = Subject;