const chalk = require('chalk'); // paint console output (with require -v 4.1.2)
const Note = require('../models/note');

async function addNote(title, owner) {
	await Note.create({ title: title, owner: owner });
	console.log(chalk.green(`New note with title "${title}" has been added!`));
}

async function getNotes() {
	const notes = await Note.find();
	return notes;
}

async function removeNote(id, owner) {
	const result = await Note.deleteOne({ _id: id, owner });
	
	if(result.matchedCount === 0) {
		throw new Error('No note to delete');
	}
	
	console.log(chalk.redBright('removed note with ID:', id));
}

async function editNote(noteData, owner) {
	const result = await Note.updateOne({ _id: noteData.id, owner}, { title: noteData.title });
	// console.log(result);
	if(result.matchedCount === 0) {
		throw new Error('No note to edit');
	}
	
	console.log(chalk.yellowBright('edited note with ID:', noteData.id));
	console.log(chalk.yellowBright('New note title:', noteData.title));
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote
}