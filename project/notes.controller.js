const fs = require('fs/promises'); // file system inside Node (read & write)
const path = require('path'); // get paths (obvious)
const chalk = require('chalk'); // paint console output (with require -v 4.1.2)

const notesPath = path.join(__dirname, 'db.json');
// console.log(notesPath);

async function addNote(title) {
	const notes = await getNotes();
	
	const note = {
		id: Date.now().toString(),
		title,
	}
	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.green('New note has been added!'));
}


async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}


async function printNotes() {
	const notes = await getNotes();
	console.log(chalk.blueBright.underline('Notes list:'), chalk.blueBright.bold(`[`));
	notes.forEach(note => {
		console.log(chalk.blueBright.bold(`${note.title},`));
	})
	console.log(chalk.blueBright.bold(`]`));
}

module.exports = {
	addNote,
	printNotes
}