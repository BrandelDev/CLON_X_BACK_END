const TweetRepository = require('../infrastructure/TweetRepository');

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async createTweet(tweetData) {
    // Aquí puedes añadir lógica de negocio adicional antes de crear el tweet
    // Por ejemplo, verificar el contenido, procesar hashtags, etc.
    const tweet = await this.tweetRepository.createTweet({
      ...tweetData,
      author: tweetData.author
    });
    return tweet;
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
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.author.toString() !== userId) {
      throw new Error('Not authorized to update this tweet');
    }
    return await this.tweetRepository.updateTweet(id, tweetData);
  }

  async deleteTweet(id, userId) {
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.author.toString() !== userId) {
      throw new Error('Not authorized to delete this tweet');
    }
    return await this.tweetRepository.deleteTweet(id);
  }

  async likeTweet(id, userId) {
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.likes.includes(userId)) {
      // Si ya le dio like, lo quitamos
      return await this.tweetRepository.updateTweet(id, { $pull: { likes: userId } });
    } else {
      // Si no le ha dado like, lo añadimos
      return await this.tweetRepository.likeTweet(id, userId);
    }
  }

  async retweetTweet(id, userId) {
    const tweet = await this.tweetRepository.getTweetById(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    if (tweet.retweets.includes(userId)) {
      // Si ya lo retweeteó, lo quitamos
      return await this.tweetRepository.updateTweet(id, { $pull: { retweets: userId } });
    } else {
      // Si no lo ha retweeteado, lo añadimos
      return await this.tweetRepository.retweetTweet(id, userId);
    }
  }
}

module.exports = TweetService;