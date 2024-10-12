const TweetRepository = require('../infrastructure/TweetRepository');

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async createTweet(tweetData) {

    const tweet = await this.tweetRepository.createTweet({
      ...tweetData,
      author: tweetData.author
    });
    return tweet;
  }


  async getTweets() {
    const tweets = await this.tweetRepository.getTweets()

    if (!tweets) {
      throw new Error('Tweets not found')
     }
     return tweets
  }

  async getTweetById(id) {
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    return tweet;
  }

  async getTweetsByUser(userId) {
    return await this.tweetRepository.getTweetsByUser(userId);
  }

  async updateTweet(id, tweetData, userId) {
    console.log('Esteeee es el user id')
    console.log(userId)
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    console.log('Este es el tweet')
    console.log(tweet)
    if (tweet.author._id.toString() !== userId) {
      throw new Error('Not authorized to update this tweet');
    }
    return await this.tweetRepository.updateTweet(id, tweetData);
  }

  async deleteTweet(id, userId) {
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.author._id.toString() !== userId) {
      throw new Error('Not authorized to delete this tweet');
    }
    return await this.tweetRepository.deleteTweet(id);
  }

  async likeTweet(id, userId) {
    console.error('Oeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    console.log(id)
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.likes.includes(userId)) {
      return await this.tweetRepository.updateTweet(id, { $pull: { likes: userId } });
    } else {
      return await this.tweetRepository.likeTweet(id, userId);
    }
  }

  async retweetTweet(id, userId) {
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.retweets.includes(userId)) {
      return await this.tweetRepository.updateTweet(id, { $pull: { retweets: userId } });
    } else {
      return await this.tweetRepository.retweetTweet(id, userId);
    }
  }
}

module.exports = TweetService;