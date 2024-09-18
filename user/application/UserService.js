const User = require('../domain/UserModel');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    try {
      const user = new User(userData);
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

  async updateUser(userId, updateData) {
    const user = await this.userRepository.findById(userId);
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
}

module.exports = UserService;