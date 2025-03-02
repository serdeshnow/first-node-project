// const express = require('express');
// const chalk = require('chalk');
// // const path = require('path');
// const { addNote, getNotes } = require('./notes.controller.js');
//
// const PORT = 3000;
// // const basePath = path.join(__dirname, 'pages');
// const app = express();
//
// app.set('view engine', 'ejs'); // Шаблонизатор для верстки (Embedded JavaScript templates)
// app.set('views', 'pages'); // Changing views directory name no pages
//
// app.use(express.urlencoded({
// 	extended: true,
// }));
//
// app.get('/', async (req, res) => {
// 	res.render('index', {
// 		title: 'Node Express App', // variable used in index.ejs
// 		notes: await getNotes(),
// 	}); // ejs rendering (supporting code injection into html)
// 	// res.sendFile(path.join(basePath, 'index.html')); // without ejs
// });
//
// app.post('/', async (req, res) => {
// 	// console.log(req.body); // data from frontend
// 	await addNote(req.body.title);
// 	// res.sendFile(path.join(basePath, 'index.ejs')); // without ejs
// 	res.render('index', {
// 		title: 'Node Express App',
// 		notes: await getNotes(),
// 	}); // ejs rendering (supporting code injection into html)
// });
//
// app.listen(PORT, () => {
// 	console.log(chalk.greenBright(`Server started on port ${PORT}`));
// 	console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
// 	console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
// });