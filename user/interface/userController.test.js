const { createUser } = require('../interface/signUpController');
const UserService = require('../application/UserService');
const httpMocks = require('node-mocks-http');

jest.mock('../application/UserService');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      body: {
        username: 'johndoe',
        name: 'John',
        lastName: 'Doe',
        avatarURL: 'http://example.com/avatar.jpg',
        email: 'john@example.com',
        password: 'password123',
        birthdate: '1990-01-01'
      }
    });
    res = httpMocks.createResponse();
  });

  it('should create a user and respond with status 201', async () => {
    UserService.prototype.createUser = jest.fn().mockResolvedValue(); // Mock createUser method

    await createUser(req, res);

    expect(UserService.prototype.createUser).toHaveBeenCalledWith({
      username: 'johndoe',
      name: 'John',
      lastName: 'Doe',
      avatarURL: 'http://example.com/avatar.jpg',
      email: 'john@example.com',
      password: 'password123',
      birthdate: '1990-01-01',
      createdAt: expect.any(String)
    });
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({
      username: 'johndoe',
      name: 'John',
      lastName: 'Doe',
      avatarURL: 'http://example.com/avatar.jpg',
      email: 'john@example.com',
      password: 'password123',
      birthdate: '1990-01-01',
      createdAt: expect.any(String)
    });
  });
});