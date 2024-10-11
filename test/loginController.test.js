const { login } = require('../user/interface/loginController'); // Reemplaza con la ruta correcta
const UserService = require('../user/application/UserService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mockeamos las dependencias
jest.mock('../user/application/UserService');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('login controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: 'johndoe@example.com',
                password: 'securepassword123',
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('debe devolver un error si el usuario no existe', async () => {
        // Mock de la función findUserByEmail para que devuelva null (usuario no encontrado)
        UserService.prototype.findUserByEmail = jest.fn().mockResolvedValue(null);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
    });

    it('debe devolver un error si la contraseña es incorrecta', async () => {
        // Mock de un usuario encontrado
        const mockUser = {
            _id: '670884afacfd4495f11ea72d',
            email: 'johndoe@example.com',
            password: 'hashedpassword',
        };
        UserService.prototype.findUserByEmail = jest.fn().mockResolvedValue(mockUser);

        // Mock de bcrypt.compare para devolver false (contraseña incorrecta)
        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email or password' });
    });

    it('debe devolver un token JWT si el login es exitoso', async () => {
        // Mock de un usuario encontrado
        const mockUser = {
            "id": "670884afacfd4495f11ea72d",
            "email": "johndoe@example.com",
            "username": "johndoe"
        };
        UserService.prototype.findUserByEmail = jest.fn().mockResolvedValue(mockUser);

        // Mock de bcrypt.compare para devolver true (contraseña correcta)
        bcrypt.compare = jest.fn().mockResolvedValue(true);

        // Mock de jwt.sign para devolver un token falso
        jwt.sign = jest.fn().mockReturnValue('mocked_token');

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successfull',
            token: 'mocked_token',
            user: {
                id: mockUser._id,
                email: mockUser.email,
                username: mockUser.username,
            }
        });
    });

    it('debe manejar errores del servidor', async () => {
        // Simulamos que la función findUserByEmail lanza un error
        UserService.prototype.findUserByEmail = jest.fn().mockRejectedValue(new Error('Error interno'));

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An error occured during login' });
    });
});