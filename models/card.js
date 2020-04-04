const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	link: {
		type: String,
		required: true,
		validate: {
			validator(v) {
				const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
				return urlRegex.test(v);
			},
			message: (props) => `${props.value} is not a valid url!`,
		},
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		default: [],
		ref: 'user',
	}],
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

module.exports = mongoose.model('card', cardSchema);
