const yargs = require('yargs');
const pkg = require('./package.json');

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
	handler: function({ title }) {
		console.log('Add new note', title);
	},
});

yargs.command({
	command: 'list', describe: 'Print all notes', handler: function() {
		console.log('List all notes');
	},
});

yargs.parse();

// console.log('worked')