const mongoose = require('mongoose')

const authschema = new mongoose.Schema({
	name:String,
	email:String,
	password:String,
	status:Number
})
module.exports = mongoose.model('Auth',authschema)