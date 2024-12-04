const yargs = require('yargs');
const pkg = require('./package.json');
const { addNote, printNotes, removeNote } = require('./notes.controller.js');
const chalk = require('chalk');

// yargs.version("1.0.0"); // the same as the code below
yargs.version(pkg.version);

yargs.command({
	command: 'add',
	describe: 'Add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true,
		},
	},
	async handler({ title }) {
		await addNote(title);
	},
	// handler: function(options) {
	// 	const { title } = options;
	// 	console.log('Add new note', title);
	// },
});

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		await printNotes();
	},
});

yargs.command({
	command: 'remove',
	describe: 'Remove note by id',
	async handler({ id }) {
		await removeNote(id);
	},
});

yargs.parse();

// console.log(chalk.bgGray("index.js worked"))