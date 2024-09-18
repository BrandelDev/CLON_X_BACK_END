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

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }
}

module.exports = UserRepository;