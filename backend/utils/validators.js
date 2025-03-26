const { check } = require('express-validator');
const User = require('../models/User');

const validateUsername = [
  check('username', 'Username is required').notEmpty(),
  check('username').custom(async (value) => {
    const existingUser = await User.findOne({ username: value });
    if (existingUser) {
      throw new Error('Username already exists');
    }
  }),
];

const validateEmail = [
  check('email', 'Valid email is required').isEmail(),
  check('email').custom(async (value) => {
    const existingUser = await User.findOne({ email: value });
    if (existingUser) {
      throw new Error('Email already exists');
    }
  }),
];

const validateLoginEmail = [
  check('email', 'Valid email is required').isEmail()
];

const validatePassword = [
  check('password', 'Password is required').notEmpty(),
  check('password', 'Password minimum length 6 required').isLength({ min: 6 }),
  check('password', 'Password must contain at least one letter').matches(/[a-zA-Z]/),
  check('password', 'Password must contain at least one digit').matches(/\d/),
  check('password', 'Password must contain at least one special character').matches(/[!@#$%^&*]/)
];

const validateConfirmPassword = [
  check('confirmPassword', 'Confirm Password is required').notEmpty(),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password & Confirm Password do not match.');
    }
    return true;
  }),
];

const validateDOB = [
  check('dob', 'Date of Birth is required').notEmpty(),
  check('dob', 'Invalid Date of Birth').isDate(), // Sample format: YYYY-MM-DD
];


const validateTitle = [
  check('title', 'Title is required').notEmpty(),
  check('title', 'Title minimum length 3 required').isLength({ min: 3 }),
  check('title', 'Title maximum length 100 required').isLength({ max: 100 })
];

const validateContent = [
  check('content', 'Content is required').notEmpty(),
  check('content', 'Content minimum length 5 required').isLength({ min: 5 }),
  check('content', 'Content maximum length 1000 required').isLength({ max: 1000 })
];

const validateTags = [
  check('tags', 'Tags is required').notEmpty(),
  check('tags', 'Tags minimum length 3 required').isLength({ min: 3 }),
  check('tags', 'Tags maximum length 100 required').isLength({ max: 100 })
];

module.exports = {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateDOB,
  validateLoginEmail,
  validateTitle,
  validateContent,
  validateTags
};
