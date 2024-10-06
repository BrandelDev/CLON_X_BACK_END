const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');


const { SignUps, createUser } = require('../user/interface/signUpController')

const { login } = require('../user/interface/loginController');
const { authMiddleware } = require('../routes/authMiddleware');
const { createTweet, updateTweet, deleteTweet, likeTweet, retweetTweet, getTweets } = require('../tweets/interface/TweetController')

const users = [];


router.post('/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('avatarURL').isURL().withMessage('Avatar URL must be a valid URL'),
    body('birthdate').notEmpty().withMessage('Birthdate is required').isDate().withMessage('Birthdate must be a valid date')]
  , (req, res, next) => {
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
  }, createUser);



router.post('/login',
  [
    body('email').notEmpty().isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Please provide a valid email')],
  (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors);

    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' })
    }


  }, login);


router.post('/tweet/create', authMiddleware, createTweet);
router.get('/tweet/get',authMiddleware, getTweets);
router.put('/tweet/update/:id', authMiddleware, updateTweet);
router.delete('/tweet/delete/:id', authMiddleware, deleteTweet);
router.post('/tweet/delete/:id/like', authMiddleware, likeTweet);
router.post('/tweet / delete /:id/retweet', authMiddleware, retweetTweet);

router.get('/post', postList)
router.get('/user', SignUps)
router.get('/follow', Followcontroller)
module.exports = router;