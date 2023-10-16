const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', getUser);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', celebrate(updateUserValidation), updateUser);

module.exports = usersRouter;
