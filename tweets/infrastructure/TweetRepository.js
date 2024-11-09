// repositories/TweetRepository.js
const Tweet = require('../domain/TweetModel');
const User = require('../../user/domain/UserModel');


class TweetRepository {

 
  async createTweet(tweetData) {
    const tweet = new Tweet(tweetData);
    return await tweet.save();
  }

  async getTweetById(id) {
    return await Tweet.findById(id).populate('author', 'UserId');
  }


  async getTweets() {
    try {
      const tweets = await Tweet.find().exec();
      console.log(tweets);

      const userIds = tweets.map((tweet) => tweet.author);
   
      
      const users = await User.find({ userId: { $in: userIds } }).select('username avatarURL userId');
      console.log('Los users')
      console.log(users)
      
      
      const userMap = {};
      users.forEach(user => {
        userMap[user.userId] = user;
      });

      console.log(userMap)
      
      const tweetsWithAuthor = tweets.map(tweet => ({
        ...tweet.toObject(),
        author: userMap[tweet.author] || null
      }));
      return tweetsWithAuthor;
    } catch (error) {
      console.error("Error al obtener tweets:", error);
      throw error;
    }
  }

  async getTweetsByUser(userId) {
    try {
      const tweets = await Tweet.find({ author: userId }).exec();
      console.log('Tweets del usuario:', tweets);

      const user = await User.findOne({ userId }).select('username avatarURL userId');
      console.log('Detalles del usuario:', user);

      const tweetsWithAuthor = tweets.map(tweet => ({
        ...tweet.toObject(),
        author: user || null
      }));

      return tweetsWithAuthor;
    } catch (error) {
      console.error("Error al obtener tweets del usuario:", error);
      throw error;
    }
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