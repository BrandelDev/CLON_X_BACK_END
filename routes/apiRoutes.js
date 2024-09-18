const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { postList } = require( '../user/interface/postController')
const { SignUps, createUser } = require( '../user/interface/signUpController')
const { Followcontroller } = require( '../user/interface/FollowController')
const users = [];


router.post('/signup',
  [  
  body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('avatarURL').isURL().withMessage('Avatar URL must be a valid URL'),
    body('birthdate').notEmpty().withMessage('Birthdate is required').isDate().withMessage('Birthdate must be a valid date')]
    ,(req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },createUser);
router.get('/post', postList)
router.get('/user', SignUps)
router.get('/follow', Followcontroller)
module.exports = router;