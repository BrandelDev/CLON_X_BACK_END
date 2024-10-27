const User = require('../domain/UserModel');
const mongoose = require('mongoose');
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
  
  async findOne(query) {
    return User.findOne(query);
  }

  async findByUsername(username) {
    return await User.findOne({ username });
  }
  async addFollower(userId, followerId) {
    const user = await User.findOne({ userId });
    if (!user) {
        throw new Error('User not found');
    }

    // Convierte followerId a ObjectId
    const followerObjectId = new mongoose.Types.ObjectId(followerId);
    
    // Verifica si ya es un seguidor antes de agregar
    if (!user.followers?.includes(followerObjectId)) {
        user.followers.push(followerObjectId);
        await user.save();
    }

    // Busca el seguidor y convierte userId a ObjectId
    const follower = await User.findOne({ userId: followerId });
    if (follower) {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        
        // Verifica si ya está siguiendo al usuario antes de agregar
        if (!follower.following?.includes(userObjectId)) {
            follower.following.push(userObjectId);
            await follower.save();
        }
    }
  }

  async getFollowerCount(userId) {
    const user = await User.findOne({ userId });

    console.log('El user-------------------------------')
    console.log(user)
    return user.followers.length;
  }

  async getFollowingCount(userId) {
    const user = await User.findOne({ userId });

    console.log('El user')
    console.log(user)
    return user.following.length;
  }
  async getFollowersWithDetails(userId) { 
    // Encuentra el usuario usando userId
    const user = await User.findOne({ userId });

    if (!user) {
        throw new Error('User not found');
    }

    // Obtiene los detalles de los seguidores utilizando el campo followers
    const followersDetails = await User.find({ userId: { $in: user.followers } }).exec();

    if (!followersDetails || followersDetails.length === 0) {
        throw new Error('Followers not found');
    }

    console.log('User with followers:', followersDetails);
    return followersDetails; // Retorna los detalles de los seguidores
}

async getFollowingsWithDetails(userId) {
  const user = await User.findOne({ userId });

  if (!user) {
      throw new Error('User not found');
  }

  const followingDetails = await User.find({ userId: { $in: user.following } }).exec();

  if (!followingDetails) {
      throw new Error('Following not found');
  }

  console.log('User with following:', followingDetails);
  return followingDetails;
}

}

module.exports = UserRepository;