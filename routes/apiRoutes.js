const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Import controllers
const { createUser } = require('../user/interface/signUpController');
const { login } = require('../user/interface/loginController');
const { authMiddleware } = require('../routes/authMiddleware');
const { createTweet, updateTweet, deleteTweet, likeTweet, retweetTweet, getTweets } = require('../tweets/interface/TweetController');

const {
  followUser,
  unfollowUser,
  getFollowerCount,
  getFollowingCount
} = require('../user/interface/followerController');

router.post('/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('avatarURL').isURL().withMessage('Avatar URL must be a valid URL'),
    body('birthdate').notEmpty().withMessage('Birthdate is required').isDate().withMessage('Birthdate must be a valid date')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUser
);

router.post('/login',
  [
    body('email').notEmpty().isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);


router.post('/tweet/create', authMiddleware, createTweet);
router.get('/tweet/get', authMiddleware, getTweets);
router.put('/tweet/update/:id', authMiddleware, updateTweet);
router.delete('/tweet/delete/:id', authMiddleware, deleteTweet);
router.post('/tweet/like/:id', authMiddleware, likeTweet); 
router.post('/tweet/retweet/:id', authMiddleware, retweetTweet); 


router.post('/follow', authMiddleware, followUser); 
router.post('/unfollow', authMiddleware, unfollowUser); 
router.get('/:userId/followers/count', authMiddleware, getFollowerCount); 
router.get('/:userId/following/count', authMiddleware, getFollowingCount);


module.exports = router;