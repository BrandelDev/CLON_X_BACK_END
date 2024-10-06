const TweetService = require('../application/TweetService');
const TweetRepository = require('../infrastructure/TweetRepository');

const tweetRepository = new TweetRepository();
const tweetService = new TweetService(tweetRepository);

const getTweets = async (req, res) => {

  try {
    const tweets = await  tweetService.getTweets();
    return res.status(200).json(tweets);
  } catch (error) {
    console.error('Error al obtener tweets:', error);
    return res.status(500).json({ message: 'Error al obtener tweets' });
  }
}

const createTweet = async (req, res) => {
  const { content, media } = req.body;
  const userId = req.user.userId;; // Asumiendo que tienes middleware de autenticación
  console.log("User ID:", userId); 
  const newTweet = {
    content,
    media,
    author: userId,
    likes: [],
    retweets: [],
    createdAt: new Date().toISOString()
  };

  console.log(newTweet)
  try {
    const createdTweet = await tweetService.createTweet(newTweet);
    res.status(201).json(createdTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTweetById = async (req, res) => {
  try {
    const tweet = await tweetService.getTweetById(req.params.id);
    if (tweet) {
      res.json(tweet);
    } else {
      res.status(404).json({ message: "Tweet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTweet = async (req, res) => {
  try {
    const updatedTweet = await tweetService.updateTweet(req.params.id, req.body, req.user.id);
    res.json(updatedTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTweet = async (req, res) => {
  try {
    await tweetService.deleteTweet(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweet = await tweetService.likeTweet(req.params.id, req.user.id);
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const retweetTweet = async (req, res) => {
  try {
    const tweet = await tweetService.retweetTweet(req.params.id, req.user.id);
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTweets,
  createTweet,
  getTweetById,
  updateTweet,
  deleteTweet,
  likeTweet,
  retweetTweet
}