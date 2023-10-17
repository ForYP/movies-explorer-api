const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

// возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.get('/', getMovies);

// создаёт фильм
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:_id', celebrate(deleteMovieValidation), deleteMovie);

module.exports = moviesRouter;
