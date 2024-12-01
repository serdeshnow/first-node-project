require('./module.js')

const person = {
	name: "Vladislav",
	age: 32,
}

function showAge (obj) {
	return `age=${obj.name}`;
}

console.log(showAge(person));
