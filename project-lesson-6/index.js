const express = require('express');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose'); // Дока: https://mongoosejs.com/docs/guide.html
const cookieParser = require('cookie-parser');
const { addNote, getNotes, removeNote, editNote } = require('./controllers/notes.controller.js');
const { addUser, loginUser } = require('./controllers/users.controller.js');
const auth = require('./middlewares/auth.js');

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

/**
 *  Middlewares
 */
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({
	extended: true,
}));

/**
 *  User API
 */
app.get('/login', async (req, res) => {
	res.render('login', {
		title: 'Node Express App',
		error: undefined,
	});
});

app.post('/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);
		res.cookie('token', token, { httpOnly: true });
		
		res.redirect('/');
	} catch (error) {
		res.render('login', {
			title: 'Node Express App',
			error: error.message,
		});
	}

});

app.get('/register', async (req, res) => {
	res.render('register', {
		title: 'Node Express App',
		error: undefined,
	});
});

app.post('/register', async (req, res) => {
		try {
			await addUser(req.body.email, req.body.password);
			res.redirect('/login');
		} catch (error) {
			console.error('User creation error', error);
			if(error.code === 11000) { // Код ошибки: Уникальная запись уже существует
				res.render('register', {
					title: 'Node Express App',
					error: "Email is already registered",
				});
				return;
			}
			res.render('register', {
				title: 'Node Express App',
				error: error.message, // можно делать кастомные ошибки, читать: Дока Mongoose
			});
		}
	},
);

app.get('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }); // Очищаем куки
	res.redirect('/login');
})

app.use(auth);

/**
 *  Note API
 */
app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Node Express App',
		notes: await getNotes(),
		userEmail: req.user.email,
		isCreated: false,
		error: false,
	});
});

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title, req.user.email);
		/** owner всегда должен храниться в req.user.email, потому что если его там не
		 *  будет, то middleware auth не пропустит этот запрос и перекинет на логин */
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			isCreated: true,
			error: false,
		});
	} catch (error) {
		console.error('Note creation error', error);
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			isCreated: false,
			error: true,
		});
	}
});

app.delete('/:id', async (req, res) => {
	// console.log('Note id to remove:', req.params.id);
	try {
		await removeNote(req.params.id, req.user.email);
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			isCreated: false,
			error: false,
		});
	} catch(error) {
		/** Тут происходит обработка серверных ошибок, если что-то пойдет не так на
		 *  стороне бэкенда
		 *  Если что-то пойдет не так, надо все равно что-то вернуть
		 *  */
		console.error('Note deletion error', error);
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			isCreated: false,
			error: error.message,
		});
	}
	
});

app.patch('/:id', async (req, res) => {
	try {
		await editNote({ id: req.body.id, title: req.body.title }, req.user.email);
		
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			isCreated: false,
			error: undefined,
		});
	} catch (error) {
		console.error('Note edit error', error);
		res.render('index', {
			title: 'Node Express App',
			notes: await getNotes(),
			userEmail: req.user.email,
			isCreated: false,
			error: error.message,
		});
	}
});

/**
 *  App startup (with MongoDB)
 */
mongoose.connect('mongodb://user:mongopass@localhost:27017/').then(() => {
	app.listen(PORT, () => {
		console.log(chalk.greenBright(`Server started on port ${PORT}`));
		console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
		console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
	});
});




