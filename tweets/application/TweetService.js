const TweetRepository = require('../infrastructure/TweetRepository');

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async createTweet(tweetData) {
    if (!tweetData || !tweetData.author) {
      throw new ValidationError('Invalid tweet data or missing author');
    }

    return this.tweetRepository.createTweet(tweetData);
  }

  async getTweets() {
    const tweets = await this.tweetRepository.getTweets();
    if (!tweets || tweets.length === 0) {
      throw new NotFoundError('No tweets found');
    }
    return tweets;
  }

  async getTweetById(id) {
    this.validateId(id);

    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new NotFoundError('Tweet not found');
    }
    return tweet;
  }

  async getTweetsByUser(userId) {
    this.validateId(userId);

    return this.tweetRepository.getTweetsByUser(userId);
  }

  async updateTweet(id, tweetData, userId) {
    this.validateId(id);
    this.validateId(userId);

    const tweet = await this.getTweetById(id);
    this.checkAuthorization(tweet.author._id, userId);

    return this.tweetRepository.updateTweet(id, tweetData);
  }

  async deleteTweet(id, userId) {
    this.validateId(id);
    this.validateId(userId);

    const tweet = await this.getTweetById(id);
    this.checkAuthorization(tweet.author._id, userId);

    return this.tweetRepository.deleteTweet(id);
  }

  async likeTweet(id, userId) {
    this.validateId(id);
    this.validateId(userId);

    const tweet = await this.getTweetById(id);

    const operation = tweet.likes.includes(userId)
      ? { $pull: { likes: userId } }
      : { $addToSet: { likes: userId } };

    return this.tweetRepository.updateTweet(id, operation);
  }

  async retweetTweet(id, userId) {
    this.validateId(id);
    this.validateId(userId);

    const tweet = await this.getTweetById(id);

    const operation = tweet.retweets.includes(userId)
      ? { $pull: { retweets: userId } }
      : { $addToSet: { retweets: userId } };

    return this.tweetRepository.updateTweet(id, operation);
  }

  // Helper methods for validation and authorization
  validateId(id) {
    if (!id) {
      throw new ValidationError('Invalid ID provided');
    }
  }

  checkAuthorization(resourceAuthorId, userId) {
    if (resourceAuthorId.toString() !== userId) {
      throw new AuthorizationError('Not authorized to perform this action');
    }
  }
}

// Custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

module.exports = TweetService;
