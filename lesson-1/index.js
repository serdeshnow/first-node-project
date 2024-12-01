// node index to run this program

require('./module.js')

const person = {
	name: "Vladislav",
	age: 32,
}

function showAge (obj) {
	return `age=${obj.name}`;
}

console.log(showAge(person));

// console.log(__filename);
// console.log(__dirname);

console.log(process.argv);
// node index test
// 0 - node application file path
// 1 - executable file path
// 2 - arguments "example - test"

// creating new project with ">> npm init"