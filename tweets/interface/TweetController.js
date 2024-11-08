const TweetService = require('../application/TweetService');
const TweetRepository = require('../infrastructure/TweetRepository');

const tweetRepository = new TweetRepository();
const tweetService = new TweetService(tweetRepository);

// Helper para manejo de respuestas
const handleResponse = (res, status, data) => res.status(status).json(data);

// Helper para manejo de errores
const handleError = (res, error, defaultMessage = 'Internal Server Error') => {
  console.error(error.message || defaultMessage);
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message || defaultMessage });
};

const getTweets = async (req, res) => {
  try {
    const tweets = await tweetService.getTweets();
    handleResponse(res, 200, tweets);
  } catch (error) {
    handleError(res, error, 'Error al obtener tweets');
  }
};

const createTweet = async (req, res) => {
  try {
    const { content, media } = req.body;
    const userId = req.user.userId;

    const newTweet = {
      content,
      media,
      author: userId,
      likes: [],
      retweets: [],
      createdAt: new Date().toISOString(),
    };

    const createdTweet = await tweetService.createTweet(newTweet);
    handleResponse(res, 201, createdTweet);
  } catch (error) {
    handleError(res, error, 'Error al crear tweet');
  }
};

const getTweetById = async (req, res) => {
  try {
    const tweet = await tweetService.getTweetById(req.params.id);
    if (!tweet) {
      return handleResponse(res, 404, { message: 'Tweet not found' });
    }
    handleResponse(res, 200, tweet);
  } catch (error) {
    handleError(res, error, 'Error al obtener tweet por ID');
  }
};

const updateTweet = async (req, res) => {
  try {
    const updatedTweet = await tweetService.updateTweet(req.params.id, req.body, req.user.userId);
    handleResponse(res, 200, updatedTweet);
  } catch (error) {
    handleError(res, error, 'Error al actualizar tweet');
  }
};

const deleteTweet = async (req, res) => {
  try {
    await tweetService.deleteTweet(req.params.id, req.user.userId);
    res.status(204).send(); // No content
  } catch (error) {
    handleError(res, error, 'Error al eliminar tweet');
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweet = await tweetService.likeTweet(req.params.id, req.user.userId);
    handleResponse(res, 200, tweet);
  } catch (error) {
    handleError(res, error, 'Error al dar like al tweet');
  }
};

const retweetTweet = async (req, res) => {
  try {
    const tweet = await tweetService.retweetTweet(req.params.id, req.user.userId);
    handleResponse(res, 200, tweet);
  } catch (error) {
    handleError(res, error, 'Error al retuitear');
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
};
