const User = require('../domain/UserModel');
const bcrypt = require('bcryptjs');


class UserService {

  constructor(userRepository) {
    this.userRepository = userRepository;
    console.log('userRepository:', this.userRepository);
  }



  async createUser(userData) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const userDataWithHashedPasswrod = {
        ...userData,
        password: hashedPassword
      }
      const user = new User(userDataWithHashedPasswrod);
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Username or email already exists');
      }
      throw error;
    }
  }

  async getUserById(userId) {
    return await this.userRepository.findById(userId);
  }

  async findUserByEmail(email) {
    console.log(email)
    return await this.userRepository.findUserByEmail(email);
  }

  async updateUser(userId, updateData) {
    const user = await this.userRepository.findOne({ userId });;
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateData);
    return await this.userRepository.save(user);
  }

  async deleteUser(userId) {
    return await this.userRepository.delete(userId);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getFollowers(userId) {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user.followers;
  }

  async getFollowings(userId) {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user.following;
  }

  async getFollowerCount(userId) {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user.followers.length;
  }

  async getFollowingCount(userId) {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user.following.length;
  }
  async followUser(userId, followerId) {
    await this.userRepository.addFollower(userId, followerId);
  }


  async unfollowUser(userId, followerId) {
    await this.userRepository.removeFollower(userId, followerId);
  }

  async getFollowersList(userId) {
    return await this.userRepository.getFollowersWithDetails(userId);
  }

  async getFollowingsList(userId) { 
    return await this.userRepository.getFollowingsWithDetails(userId)
  }





}



module.exports = UserService;