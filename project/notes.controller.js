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
	console.log(chalk.green(`New note with title "${title}" has been added!`));
}


async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}


async function printNotes() {
	const notes = await getNotes();
	console.log(chalk.blueBright.underline('Notes list:'));
	notes.forEach(note => {
		console.log(chalk.blueBright.bold(`${note.id} ${note.title}`));
	})
}

async function removeNote(id) {
	const notes = await getNotes();
	const filteredNotes = notes.filter(note => note.id !== String(id));
	await fs.writeFile(notesPath, JSON.stringify(filteredNotes), {encoding:'utf8',flag:'w'})
	console.log(chalk.green('removed note(s) with ID:', id));
}

module.exports = {
	addNote,
	getNotes,
	printNotes,
	removeNote,
}