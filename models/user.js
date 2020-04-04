const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	about: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	avatar: {
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
	email: {
		type: String,
		required: true,
		validate: {
			validator(v) {
				// const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]
				// {0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i;
				// return emailRegex.test(v);
				return validator.isEmail(v);
			},
			message: (props) => `${props.value} is not a valid Email!`,
		},
		unique: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
});

userSchema.statics.findUser = function (email, password) {
	return this.findOne({ email }).select('+password')
		.then((user) => {
			if (!user) {
				return Promise.reject(new Error('Неправильные почта или пароль'));
			}

			return bcrypt.compare(password, user.password)
				.then((matched) => {
					if (!matched) {
						return Promise.reject(new Error('Неправильные почта или пароль'));
					}
					return user;
				});
		});
};

module.exports = mongoose.model('user', userSchema);
