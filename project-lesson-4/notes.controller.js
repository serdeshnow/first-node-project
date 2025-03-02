/** Нам больше не нужен fs и path, notesPath тоже
 * */
// const fs = require('fs/promises'); // file system inside Node (read & write)
// const path = require('path'); // get paths (obvious)
const chalk = require('chalk'); // paint console output (with require -v 4.1.2)
const Note = require('./models/note');

// const notesPath = path.join(__dirname, 'db.json');
// console.log(notesPath);

async function addNote(title) {
	// const notes = await getNotes();

	// const note = {
	// 	id: Date.now().toString(),
	// 	title,
	// }
	// notes.push(note);

	// await fs.writeFile(notesPath, JSON.stringify(notes))
	//// await Note.create(note);
	await Note.create({ title: title });
	console.log(chalk.green(`New note with title "${title}" has been added!`));
}

/** Подключим Note из MongoDB вместо обращения к файлу
 * */
async function getNotes() {
	const notes = await Note.find();
	/** Разработчики позаботились о нас и мы можем доставать идентификатор, который
	 *  автоматически присваивается записи в разном виде
	 * */
	// console.log(typeof notes[0].id); /// string
	// console.log(typeof notes[0]._id); /// object
	// console.log(notes[0].id); /// 67c468b2b7936285a4d1edac
	// console.log(notes[0]._id); /// new ObjectId('67c468b2b7936285a4d1edac')
	return notes;
}

async function removeNote(id) {
	// const notes = await getNotes();
	// const filteredNotes = notes.filter(note => note.id !== String(id));
	// await fs.writeFile(notesPath, JSON.stringify(filteredNotes), {encoding:'utf8',flag:'w'})
	await Note.deleteOne({ _id: id });
	console.log(chalk.redBright('removed note with ID:', id));
}

/** Существует несколько способов изменить заметку:
 * 1. Найти модель - сделать изменение - сохранить
 * 2. MongooseModel.updateOne() - удобно использовать, если мы хотим просто поменять
 *    документ и ничего больше с ним не делать
 * 3. MongooseModel.findOneAndUpdate() - удобен, если мы хотим получить доступ к
 *    модели - хотим ее поменять и сразу получить, чтобы, например, отдать на frontend
 * */
async function editNote(noteData) {
	// const notes = await getNotes();
	// const noteIndexToEdit = notes.findIndex(note => note.id === id);
	// notes[noteIndexToEdit].title = title;
	// await fs.writeFile(notesPath, JSON.stringify(notes))
	
	await Note.updateOne({ _id: noteData.id }, { title: noteData.title });
	
	console.log(chalk.yellowBright('edited note with ID:', noteData.id));
	console.log(chalk.yellowBright('New note title:', noteData.title));
}

module.exports = {
	addNote,
	getNotes,
	removeNote,
	editNote
}