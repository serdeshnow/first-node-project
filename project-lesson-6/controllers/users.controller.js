const User = require('../models/User');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants.js');

async function addUser(email, password) {
	const passwordHash = await bcrypt.hash(password, 10);
	await User.create({email: email, password: passwordHash});
	console.log(chalk.green(`New user with email "${email}" has been added!`));
}

async function loginUser(email, password) {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("User not found");
	}
	
	const isPasswordcorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordcorrect) {
		throw new Error("Wrong password");
	}
	
	return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
}

module.exports = {
	addUser,
	loginUser,
}