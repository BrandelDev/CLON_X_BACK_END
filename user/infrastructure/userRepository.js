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
}

module.exports = UserRepository;