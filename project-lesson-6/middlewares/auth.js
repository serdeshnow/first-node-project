const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants.js');

function auth(req, res, next) {
	const token = req.cookies.token;
	
	try {
		const verifyResult = jwt.verify(token, JWT_SECRET);
		// console.log('verifyResult', verifyResult);
		
		req.user = {
			email: verifyResult.email,
		}
		
		next();
	} catch(error) {
		res.redirect('/login'); // Токен неправильный, редирект на логин
	}
}

module.exports = auth;