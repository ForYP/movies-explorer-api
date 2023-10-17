const signinRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login } = require('../controllers/users');
const { loginValidation } = require('../middlewares/validation');

signinRouter.post('/', celebrate(loginValidation), login);

module.exports = signinRouter;
