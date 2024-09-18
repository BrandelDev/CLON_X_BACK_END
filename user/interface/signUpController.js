const UserService = require('../application/UserService');
const UserRepository = require('../infrastructure/userRepository');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);



const SignUps = (request, response) => {
  response.json(Sign)
}

createUser = async  (req, res) => {
  req.body;

  const { username, name, lastName, avatarURL, email, password, birthdate } = req.body;


  const newUser = {
    name,
    lastName,
    birthdate,
    username,
    email,
    password: password,
    avatarURL,
    createdAt: new Date().toISOString()
  };

  userService.createUser(newUser);  

  res.status(201).json(newUser);
};

module.exports = {
  SignUps, createUser
}