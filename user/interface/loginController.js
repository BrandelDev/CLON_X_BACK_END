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
                username: user.username
            }
        });

    } catch(e) {
        console.log(e)
        res.status(500).json({ error: 'An error occured during login' })
    };
};

module.exports = {
    login
};