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


const getFollowersList = async (req, res) => {
    console.log(req.params)
    const { userId } = req.params
    try {
        const followers = await userService.getFollowersList(userId);
        if (!followers) {
            return res.status(200).json({followers: []});
        }
        res.status(200).json({
            followers: followers.map(follower => ({
                username: follower.username,
                userId: follower.userId,
                avatarURL: follower.avatarURL
            }))
        });
    } catch (error) { 
        res.status(500).json({error: error.message})
    }
}

const getFollowingsList = async (req, res) => {
    console.log(req.params)
    const { userId } = req.params
    try {
        const followings = await userService.getFollowingsList(userId);
        if (!followings) {
            return res.status(200).json({followings: []})
        }
        res.status(200).json({
            followings: followings.map(following => ({
                username: following.username,
                userId: following.userId,
                avatarURL: following.avatarURL
            }))
        });
    } catch (error) { 
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowerCount,
    getFollowingCount,
    getFollowersList,
    getFollowingsList
};