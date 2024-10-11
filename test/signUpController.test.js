const { createUser } = require('../user/interface/signUpController'); // Reemplaza con la ruta correcta
const UserService = require('../user/application/UserService');

// Mockeamos el servicio de usuario
jest.mock('../user/application/UserService');

describe('createUser controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                username: 'testUser',
                name: 'John',
                lastName: 'Doe',
                avatarURL: 'https://example.com/avatar.png',
                email: 'test@example.com',
                password: 'password123',
                birthdate: '1990-01-01'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mockeamos el método createUser del UserService
        UserService.prototype.createUser = jest.fn().mockResolvedValue();
    });

    it('debe crear un nuevo usuario y devolver un estado 201 con los datos del usuario', async () => {
        const newUser = {
            ...req.body,
            createdAt: expect.any(String) // No sabemos la fecha exacta, pero esperamos un string
        };

        await createUser(req, res);

        // Verificamos que createUser haya sido llamado con los datos correctos
        expect(UserService.prototype.createUser).toHaveBeenCalledWith(newUser);

        // Verificamos que el código de estado sea 201
        expect(res.status).toHaveBeenCalledWith(201);

        // Verificamos que se haya enviado la respuesta con los datos del nuevo usuario
        expect(res.json).toHaveBeenCalledWith(newUser);
    });
});