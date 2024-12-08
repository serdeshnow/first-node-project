const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller.js');

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs'); // Шаблонизатор для верстки (Embedded JavaScript templates)
app.set('views', 'pages'); // Changing views directory name no pages

// middlewares with app.use()
app.use(express.json()) // вкл возможность отправлять на сервер данные в формате JSON
app.use(express.static(path.resolve(__dirname, 'public'))); // use public folder as static
app.use(express.urlencoded({
	extended: true,
}));

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		isCreated: false,
	});
});

app.post('/', async (req, res) => {
	await addNote(req.body.title);
	
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		isCreated: true,
	});
});

app.delete('/:id', async (req, res) => {
	console.log('Note id to remove:', req.params.id)
	await removeNote(req.params.id);
	
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		isCreated: false,
	});
})

app.patch('/:id', async (req, res) => {
	// console.log('Note id to edit:', req.params.id);
	// console.log('Note req to edit:', req.body.title);
	const noteId = req.body.id;
	const noteTitle = req.body.title;
	
	await editNote(noteId, noteTitle);
	
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		isCreated: false,
	});
})

app.listen(PORT, () => {
	console.log(chalk.greenBright(`Server started on port ${PORT}`));
	console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
	console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
});