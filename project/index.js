const http = require('http');
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');

const basePath = path.join(__dirname, 'pages')

const PORT = 3000;

const server = http.createServer(async(req, res) => {
	console.log(chalk.blueBright('Server is running'));
	// console.log(chalk.blueBright('Request object:\n\r'), req); // All info about request
	console.log(chalk.blueBright('Request method:\n\r'), req.method); // request method
	console.log(chalk.blueBright('Request url:\n\r'), req.url); // requset url
	
	if (req.method === 'GET') {
		const content = await fs.readFile(path.join(basePath, 'index.html'))
		// res.setHeader('Content-Type', 'text/html'); // response content type (analogue)
		res.writeHead(200, {
			'Content-Type': 'text/html; charset=utf-8',
		}); // response status code
		res.end(content); //
	}
	
})

server.listen(PORT, () => {
	console.log(chalk.greenBright(`Server started on port ${PORT}`));
	console.log(chalk.greenBright(`\n>> http://localhost:${PORT}\n\r`));
	console.log(chalk.greenBright(`To terminate process, press ctrl + C\n`));
}) ;