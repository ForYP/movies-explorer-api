const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
const {
  FORBIDDEN_DELETE_MOVIE,
  MOVIE_DELETED,
  MOVIE_NOT_FOUND,
  ERROR_INCORRECT_DATA,
} = require('../utils/constant');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE);
      }
      return Movie.deleteOne(movie)
        .then(() => res.send({ message: MOVIE_DELETED }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_INCORRECT_DATA));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(MOVIE_NOT_FOUND));
      } else {
        next(err);
      }
    });
};
