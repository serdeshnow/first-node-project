const path = require('path');

// console.log(path.dirname(__filename)); // DiskName:/path/to/my/file/path.js
// console.log(path.basename(__filename)); // path.js
// console.log(path.extname(__filename)); // .js
// console.log(path.extname(__filename).slice(1)); // js
// console.log(path.parse(__filename)); // [Object with info]
console.log(path.resolve(__dirname, '..', './modules', './app.js')); // DiskName:/path/to/my/file/app.js form this file
console.log(path.join(__dirname, '..', './modules', './app.js')); // DiskName:/path/to/my/file/app.js form this file