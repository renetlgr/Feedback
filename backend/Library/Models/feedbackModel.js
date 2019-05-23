let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let feedbackSchema = new Schema({
	name : String,
	message : String,
	type : String,
	status : String,
	//createdAt: {type:Date, default:new Date()}
},
{ timestamps: true }
);

module.exports = mongoose.model('feedback', feedbackSchema);