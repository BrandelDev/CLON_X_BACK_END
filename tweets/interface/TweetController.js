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
  console.log('este es este es el media')
  console.log(media)
  const userId = req.user.userId;;
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

const getTweetsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const tweets = await tweetRepository.getTweetsByUser(id);
    res.status(200).json(tweets);
  } catch (error) {
    console.error("Error al obtener tweets del usuario:", error);
    res.status(500).json({ message: "Error al obtener los tweets del usuario." });
  }
};

const updateTweet = async (req, res) => {
  try {
    const updatedTweet = await tweetService.updateTweet(req.params.id, req.body, req.user.userId);
    console.log('Esteeee es el user id')
    console.log(req.user.userId)
    res.json(updatedTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTweet = async (req, res) => {
  try {
    await tweetService.deleteTweet(req.params.id, req.user.userId);
    console.log()
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const likeTweet = async (req, res) => {
  debugger;
  try {
    console.log(req)
    const tweet = await tweetService.likeTweet(req.params.id, req.user.userId);
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const retweetTweet = async (req, res) => {
  try {
    const tweet = await tweetService.retweetTweet(req.params.id,  req.user.userId);
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
  retweetTweet,
  getTweetsByUser
}