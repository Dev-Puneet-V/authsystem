const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		default: null
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true
	},
	password: {
		type: String
	},
	token: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('user', userSchema);