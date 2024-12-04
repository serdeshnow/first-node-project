import path from 'path';
import { Playground } from './playground.js';
import { fileURLToPath } from 'url';

console.log(Playground.NUM);

// console.log(__dirname); // is not defined in ES scope
// console.log(__filename);
// // BUT:

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(__filename);