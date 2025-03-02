const mongoose = require('mongoose');

/** Создаем схему данных - по ней mongoose будет валидировать данные */

const NoteSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}
});

/** Схема - описание структур данных, а Модель - абстракция, с которой мы будем
 *  работать в приложении. Модель позволяет сохранять, доставать данные и т.п. */

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;