const User = require('../domain/UserModel');

class UserRepository {
  async save(user) {
    if (user.userId) {
      return await User.findByIdAndUpdate(user.userId, user, { new: true });
    } else {
      return await User.create(user);
    }
  }

  async findById(userId) {
    return await User.findById(userId);
  }

  async delete(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async findAll() {
    return await User.find();
  }

  async findUserByEmail(email) {
    try {
      // Usando Mongoose para encontrar un usuario por email
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      throw new Error('Error fetching user by email');
    }
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }

  async addFollower(userId, followerId) {
    const user = await this.userRepository.findById(userId);
    if (!user.followers.includes(followerId)) {
      user.followers.push(followerId);
      await user.save();
    }

    const follower = await this.userRepository.findById(followerId);
    if (!follower.following.includes(userId)) {
      follower.following.push(userId);
      await follower.save();
    }
  }

  async removeFollower(userId, followerId) {
    const user = await this.userRepository.findById(userId);
    user.followers = user.followers.filter(id => id.toString() !== followerId.toString());
    await user.save();

    const follower = await this.userRepository.findById(followerId);
    follower.following = follower.following.filter(id => id.toString() !== userId.toString());
    await follower.save();
  }

  async getFollowerCount(userId) {
    const user = await this.userRepository.findById(userId);
    return user.followers.length;
  }

  async getFollowingCount(userId) {
    const user = await this.userRepository.findById(userId);
    return user.following.length;
  }
}

module.exports = UserRepository;