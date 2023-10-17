const signupRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser } = require('../controllers/users');
const { createUserValidation } = require('../middlewares/validation');

signupRouter.post('/', celebrate(createUserValidation), createUser);

module.exports = signupRouter;
