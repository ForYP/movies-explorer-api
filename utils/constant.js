require('dotenv').config();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  PORT,
  DB_URL,
};

module.exports.FORBIDDEN_DELETE_MOVIE = 'Нельзя удалять фильмы других пользователей';
module.exports.MOVIE_DELETED = 'Фильм удалён';
module.exports.MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
module.exports.ERROR_INCORRECT_DATA = 'Переданы некорректные данные';
module.exports.USER_NOT_FOUND = 'Пользователь с указанным _id не найден';
module.exports.ERROR_DUPLICATE_USER_EMAIL = 'Пользователь с таким email уже зарегистрирован';
module.exports.AUTHORIZATION_REQUIRED = 'Необходима авторизация';
