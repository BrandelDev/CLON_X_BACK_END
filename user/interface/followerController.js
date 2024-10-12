const UserService = require('../application/UserService');
const UserRepository = require('../infrastructure/userRepository');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const followUser = async (req, res) => {
    const { userId, followerId } = req.body;
    try {
        await userService.followUser(userId, followerId);
        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    const { userId, followerId } = req.body;
    try {
        await userService.unfollowUser(userId, followerId);
        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFollowerCount = async (req, res) => {
    const { userId } = req.params;
    try {
        const count = await userService.getFollowerCount(userId);
        res.status(200).json({ followerCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFollowingCount = async (req, res) => {
    const { userId } = req.params;
    try {
        const count = await userService.getFollowingCount(userId);
        res.status(200).json({ followingCount: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    followUser,
    unfollowUser,
    getFollowerCount,
    getFollowingCount
};