const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');
console.log(notesPath);

async function addNote(title) {
	// const buffer = await fs.readFile(notesPath); // Buffer of network (?) pkgs
	// const notes = Buffer.from(buffer).toString("utf-8")
	const notes = await getNotes();
	
	// console.log('Notes from buffer is array?:', Array.isArray(notes));
	// console.log('Type of notes:', typeof notes);
	// console.log('Type of parsed notes:', typeof JSON.parse(notes));
	// console.log('Notes:', notes);
	
	const note = {
		id: Date.now().toString(),
		title,
	}
	
	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.green('New note has been added!'));
}

async function getNotes() {
	// return require('./db.json');
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

module.exports = {
	addNote : addNote, // prop name === export name
	getNotes
}