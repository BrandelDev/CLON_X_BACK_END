const {
    getTweets,
    createTweet,
    getTweetById,
    updateTweet,
    deleteTweet,
    likeTweet,
    retweetTweet
} = require('../tweets/interface/TweetController'); // Reemplaza con la ruta correcta

const jwt = require('jsonwebtoken'); // Importa la librería JWT

const TweetService = require('../tweets/application/TweetService');
const { authMiddleware } = require('../routes/authMiddleware');
// Mock de TweetService
jest.mock('../tweets/application/TweetService');

describe('TweetController', () => {
    let req, res;

    beforeEach(() => {
        const secret = 'elsecret'
        const token = jwt.sign({ id: '66f079d9032c601977bd0236' }, secret, { expiresIn: '1h' });

        req = {
            user: {
                userId:'66f079d9032c601977bd0236'
            },
            headers: {
                authorization: `Bearer ${token}` // Agrega el token a los encabezados
            },
            params: {}
        }; // Puedes agregar propiedades al objeto si son necesarias
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        TweetService.prototype.getTweets = jest.fn();
        TweetService.prototype.createTweet = jest.fn();
        TweetService.prototype.getTweetById = jest.fn();
        TweetService.prototype.updateTweet = jest.fn();
        TweetService.prototype.deleteTweet = jest.fn();
        TweetService.prototype.likeTweet = jest.fn();
        TweetService.prototype.retweetTweet = jest.fn();
    });

    describe('getTweets', () => {
        it('debe devolver todos los tweets con status 200', async () => {
            const mockTweets = [
                {
                    _id: "6702ca9001f349cc541499a4",
                    content: "Este es un tweet de ejemplo",
                    author: {
                        _id: "66f079d9032c601977bd0236",
                        username: "BrandelDev"
                    },
                    likes: [],
                    retweets: [],
                    media: [
                        {
                            type: "image",
                            url: "https://ejemplo.com/imagen.jpg",
                            _id: "6702ca9001f349cc541499a5"
                        }
                    ],
                    createdAt: "2024-10-06T17:36:16.237Z",
                    __v: 0
                }
            ];
            TweetService.prototype.getTweets.mockResolvedValue(mockTweets);

            await getTweets(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTweets);
        });
    });

    describe('createTweet', () => {
        it('debe crear un tweet y devolver status 201', async () => {
            const mockTweet = {
                content: "Este es un tweet de ejemplo",
                author: "66f079d9032c601977bd0236",
                likes: [],
                retweets: [],
                media: [
                    {
                        type: "image",
                        url: "https://ejemplo.com/imagen.jpg",
                        _id: "6709d687f0c61b9feb9d74a7"
                    }
                ],
                createdAt: "2024-10-12T01:53:11.655Z",
                _id: "6709d687f0c61b9feb9d74a6",
                __v: 0
            };
            TweetService.prototype.createTweet.mockResolvedValue(mockTweet);



            req.body = {
                content: "Este es un tweet de ejemplo11",
                author: "66f079d9032c601977bd0236",  // El ID del usuario que crea el tweet
                media: [
                    {
                        type: "image",
                        url: "https://ejemplo.com/imagen.jpg"
                    }
                ]
            }
            console.log(req)


            console.log(req)
            await createTweet(req, res);



            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockTweet);
        });

        it('debe devolver un error 400 si ocurre un error', async () => {
            const mockError = new Error('Error al crear tweet');
            TweetService.prototype.createTweet.mockRejectedValue(mockError);

            req.body = {
                content: "Este es un tweet de ejemplo para las pruebas",
                media: [
                    {
                        type: "image",
                        url: "https://ejemplo.com/imagen.jpg"
                    }
                ],
            };

                await createTweet(req, res);            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
    });

    describe('getTweetById', () => {
        it('debe devolver un tweet por id', async () => {
          const mockTweet = [
            {
                _id: "66f079d9032c601977bd0236",
                content: "Este es un tweet de ejemplo",
                author: {
                    _id: "670884afacfd4495f11ea72d",
                    username: "johndoe"
                },
                likes: [],
                retweets: [],
                media: [
                    {
                        type: "image",
                        url: "https://ejemplo.com/imagen.jpg",
                        _id: "670888077ad0789d8c7064ea"
                    }
                ],
                createdAt: "2024-10-11T02:05:59.411Z",
                __v: 0
            }
        ];
          TweetService.prototype.getTweetById.mockResolvedValue(mockTweet);

          req.params.id = '6702ca9001f349cc541499a4';
          await getTweetById(req, res);
          
    
          expect(TweetService.prototype.getTweetById).toHaveBeenCalledWith('6702ca9001f349cc541499a4');
          expect(res.json).toHaveBeenCalledWith(mockTweet);
        });
    
        it('debe devolver 404 si el tweet no existe', async () => {
          TweetService.prototype.getTweetById.mockResolvedValue(null);
    
          await getTweetById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ message: 'Tweet not found' });
        });
    
        it('debe devolver un error 500 si ocurre un error', async () => {
          const mockError = new Error('Error interno');
          TweetService.prototype.getTweetById.mockRejectedValue(mockError);
    
          await getTweetById(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
      });


      describe('updateTweet', () => {
        it('debe actualizar un tweet y devolver el tweet actualizado', async () => {
          const mockUpdatedTweet =  
            {
                _id: "670888077ad0789d8c7064e9",
                content: "Este es un tweet de ejemplo",
                author: {
                    _id: "670884afacfd4495f11ea72d",
                    username: "johndoe"
                },
                likes: [],
                retweets: [],
                media: [
                    {
                        type: "image",
                        url: "https://ejemplo.com/imagen.jpg",
                        _id: "670888077ad0789d8c7064ea"
                    }
                ],
                createdAt: "2024-10-11T02:05:59.411Z",
                __v: 0
            };
          TweetService.prototype.updateTweet.mockResolvedValue(mockUpdatedTweet);
          req.params.id = '6709d687f0c61b9feb9d74a6';
          await updateTweet(req, res);
    
          expect(TweetService.prototype.updateTweet).toHaveBeenCalledWith('6709d687f0c61b9feb9d74a6', req.body, '66f079d9032c601977bd0236');
          expect(res.json).toHaveBeenCalledWith(mockUpdatedTweet);
        });
    
        it('debe devolver un error 400 si ocurre un error', async () => {
          const mockError = new Error('Error al actualizar tweet');
          TweetService.prototype.updateTweet.mockRejectedValue(mockError);
    
          await updateTweet(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
      });


      describe('deleteTweet', () => {
        it('debe eliminar un tweet y devolver status 204', async () => {
          TweetService.prototype.deleteTweet.mockResolvedValue();
          req.params.id = '6702ca9001f349cc541499a4';
          await deleteTweet(req, res);
    
          expect(res.status).toHaveBeenCalledWith(204);
      
        });
    
        it('debe devolver un error 400 si ocurre un error', async () => {
          const mockError = new Error('Error al eliminar tweet');
          TweetService.prototype.deleteTweet.mockRejectedValue(mockError);
    
          await deleteTweet(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
      });

      describe('likeTweet', () => {
        it('debe añadir un like a un tweet', async () => {
          const mockTweet =  {
            "_id": "6702ca9001f349cc541499a4",
            "content": "Este es un tweet de ejemplo",
            "author": {
                "_id": "66f079d9032c601977bd0236",
                "username": "BrandelDev"
            },
            "likes": [],
            "retweets": [],
            "media": [
                {
                    "type": "image",
                    "url": "https://ejemplo.com/imagen.jpg",
                    "_id": "6702ca9001f349cc541499a5"
                }
            ],
            "createdAt": "2024-10-06T17:36:16.237Z",
            "__v": 0
        };
          TweetService.prototype.likeTweet.mockResolvedValue(mockTweet);
    
          await likeTweet(req, res);
    
          expect(TweetService.prototype.likeTweet).toHaveBeenCalledWith(undefined,'66f079d9032c601977bd0236');
          expect(res.json).toHaveBeenCalledWith(mockTweet);
        });
    
        it('debe devolver un error 400 si ocurre un error', async () => {
          const mockError = new Error("Cannot read properties of undefined (reading 'id')");
          TweetService.prototype.likeTweet.mockRejectedValue(mockError);
    
          await likeTweet(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
      });

      describe('retweetTweet', () => {
        it('debe hacer retweet de un tweet', async () => {
          const mockTweet = {
            "_id": "6702ca9001f349cc541499a4",
            "content": "Este es un tweet de ejemplo",
            "author": {
                "_id": "66f079d9032c601977bd0236",
                "username": "BrandelDev"
            },
            "likes": [],
            "retweets": [],
            "media": [
                {
                    "type": "image",
                    "url": "https://ejemplo.com/imagen.jpg",
                    "_id": "6702ca9001f349cc541499a5"
                }
            ],
            "createdAt": "2024-10-06T17:36:16.237Z",
            "__v": 0
        };
          TweetService.prototype.retweetTweet.mockResolvedValue(mockTweet);
    
          await retweetTweet(req, res);
    
          expect(TweetService.prototype.retweetTweet).toHaveBeenCalledWith(undefined, '66f079d9032c601977bd0236');
          expect(res.json).toHaveBeenCalledWith(mockTweet);
        });
    
        it('debe devolver un error 400 si ocurre un error', async () => {
          const mockError = new Error("Cannot read properties of undefined (reading 'id')");
          TweetService.prototype.retweetTweet.mockRejectedValue(mockError);
    
          await retweetTweet(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
        });
      });
    
  

});