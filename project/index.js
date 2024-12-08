const express = require('express');
const chalk = require('chalk');
const { addNote, getNotes } = require('./notes.controller.js');

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs'); // Шаблонизатор для верстки (Embedded JavaScript templates)
app.set('views', 'pages'); // Changing views directory name no pages

app.use(express.urlencoded({
	extended: true,
}));

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
	});
});

app.post('/', async (req, res) => {
	await addNote(req.body.title);
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
	});
});

app.listen(PORT, () => {
	console.log(chalk.greenBright(`Server started on port ${PORT}`));
	console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
	console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
});