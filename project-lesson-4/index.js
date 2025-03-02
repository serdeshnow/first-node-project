const express = require('express');
const chalk = require('chalk');
const path = require('path');
const { addNote, getNotes, removeNote, editNote } = require('./notes.controller.js');
const mongoose = require('mongoose');

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
		hasError: false
	});
});

app.post('/', async (req, res) => {
	/** После работы в addNote улучшаем UX (предотвращаем падения приложения из-за
	 *  невалидного поведения пользователя) - обернем в try catch
	 * */
	try {
		await addNote(req.body.title);
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			isCreated: true,
			hasError: false
		});
	} catch (error) {
		console.error('Creation error', error);
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			isCreated: false,
			hasError: true, // Передаем информацию, что что-то сломалось
		});
	}
});

app.delete('/:id', async (req, res) => {
	console.log('Note id to remove:', req.params.id)
	await removeNote(req.params.id);
	
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		isCreated: false,
		hasError: false,
	});
})

app.patch('/:id', async (req, res) => {
	// console.log('Note id to edit:', req.params.id);
	// console.log('Note req to edit:', req.body.title);
	// const noteId = req.body.id;
	// const noteTitle = req.body.title;
	
	const noteData = {id: req.body.id, title: req.body.title};
	
	await editNote(noteData);
	
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		isCreated: false,
		hasError: false,
	});
})

/** создаем старт БД рядом со старом приложения */
// mongoose.connect('mongodb://user:mongopass@localhost:27017/')
/** после слеша можем указывать имя БД, с которой хотим работать: (например, notes)*/
// mongoose.connect('mongodb://user:mongopass@localhost:27017/notes')
/** Чтобы приложение стартануло только после того, как будет установлено соединение с
 *  БД (чтобы ничего не лягло), connect возвращает Promise: */
// mongoose.connect('mongodb://user:mongopass@localhost:27017/').then(() => {
// 	app.listen(PORT, () => {
// 		console.log(chalk.greenBright(`Server started on port ${PORT}`));
// 		console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
// 		console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
// 	});
// })

/** После подключения модели можем **протестировать**, создав заметку: */
// mongoose.connect('mongodb://user:mongopass@localhost:27017/').then(async () => {
// 	await Note.create({title: 'титле'});
// 	app.listen(PORT, () => {
// 		console.log(chalk.greenBright(`Server started on port ${PORT}`));
// 		console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
// 		console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
// 	});
// })

/** Теперь данные хранятся в MongoDB, можем избавиться от db.json
 *  Для этого начнем с того, что начнем заменять использование файла на использование
 *  базы с основного контроллера. Он использует данные из getNotes() [notes.controller.js]
 * */
mongoose.connect('mongodb://user:mongopass@localhost:27017/').then(() => {
	app.listen(PORT, () => {
		console.log(chalk.greenBright(`Server started on port ${PORT}`));
		console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
		console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
	});
})




