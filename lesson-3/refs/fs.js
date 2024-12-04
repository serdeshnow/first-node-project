const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

const base = path.join(__dirname, "temp");

// // This is like how to use fs/promises

const pasteContent = () => `
${process.argv[2] ?? ''}\n\r
`

async function start() {
	try {
		if (fsSync.existsSync(base)) { // если уже существует путь (папка/файл)
			await fs.appendFile(path.join(base, 'logs.txt'), pasteContent())
			// process.argv[2] - text from console
			const data = await fs.readFile(path.join(base, 'logs.txt'), { encoding: 'utf-8' });
			console.log(data)
		} else {
			await fs.mkdir(base); // mkdir = make direction (folder)
			console.log("Created temp folder");
			await fs.appendFile(path.join(base, 'logs.txt'), pasteContent())
			// process.argv[2] - text from console
		}
	} catch (error) {
		console.log("Error creating temp folder: ", error);
	}
	// console.log('File has been created/rewrote successfully');
}

start();

// // Another example of using fs/promises

// fs.mkdir(base).then(() => {
// 	console.log("Created temp folder");
// }).catch((error) => {
// 	console.log("Error creating temp folder: ", error);
// })