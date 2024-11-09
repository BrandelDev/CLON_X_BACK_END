const UserService = require('../application/UserService');
const UserRepository = require('../infrastructure/userRepository')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const login = async (req, res) => {
    try {

        console.log(req.body)
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        //generate JWT

        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successfull',
            token,
            user: {
                id: user.userId,
                email: user.email,
                username: user.username,
                avatarURL: user.avatarURL
            }
        });

    } catch(e) {
        console.log(e)
        res.status(500).json({ error: 'An error occured during login' })
    };
};


const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token provided' });
    }

    try {
        // Verificar el `refreshToken`
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const newAccessToken = jwt.sign(
            { userId: decoded.userId, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(403).json({ error: 'Invalid refresh token' });
    }
};
module.exports = {
    login,
    refreshToken
};