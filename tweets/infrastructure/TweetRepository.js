// repositories/TweetRepository.js
const Tweet = require('../domain/TweetModel');

class TweetRepository  {
  async createTweet(tweetData) {
    const tweet = new Tweet(tweetData);
    return await tweet.save();
  }

  async getTweetById(id) {
    return await Tweet.findById(id).populate('author', 'username');
  }


  async  getTweets() {
      return Tweet.find()
        .populate('author', 'username') 
        .populate('likes', 'username') 
        .populate('retweets', 'username') 
        .populate('parentTweet') 
        .exec(); 
  }
  
  async getTweetsByUser(userId) {
    return await Tweet.find({ author: userId }).sort({ createdAt: -1 }).populate('author', 'username');
  }

  async updateTweet(id, tweetData) {
    return await Tweet.findByIdAndUpdate(id, tweetData, { new: true });
  }

  async deleteTweet(id) {
    return await Tweet.findByIdAndDelete(id);
  }

  async likeTweet(id, userId) {
    
    return await Tweet.findByIdAndUpdate(id, { $addToSet: { likes: userId } }, { new: true });
  }

  async retweetTweet(id, userId) {
    return await Tweet.findByIdAndUpdate(id, { $addToSet: { retweets: userId } }, { new: true });
  }
}

module.exports = TweetRepository;