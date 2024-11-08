const {
    getTweets,
    createTweet,
    getTweetById,
    updateTweet,
    deleteTweet,
    likeTweet,
    retweetTweet,
  } = require('../tweets/interface/TweetController'); // Ajusta la ruta según sea necesario
  
  const jwt = require('jsonwebtoken');
  const TweetService = require('../tweets/application/TweetService');
  
  // Mock de TweetService
  jest.mock('../tweets/application/TweetService');
  
  describe('TweetController', () => {
    let req, res;
  
    const secret = 'elsecret';
  
    beforeEach(() => {
      const token = jwt.sign({ id: '66f079d9032c601977bd0236' }, secret, { expiresIn: '1h' });
  
      req = {
        user: { userId: '66f079d9032c601977bd0236' },
        headers: { authorization: `Bearer ${token}` },
        params: {},
        body: {},
      };
  
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mockear métodos de TweetService
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
            author: { _id: "66f079d9032c601977bd0236", username: "BrandelDev" },
            likes: [],
            retweets: [],
            media: [{ type: "image", url: "https://ejemplo.com/imagen.jpg", _id: "6702ca9001f349cc541499a5" }],
            createdAt: "2024-10-06T17:36:16.237Z",
          },
        ];
  
        TweetService.prototype.getTweets.mockResolvedValue(mockTweets);
        await getTweets(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockTweets);
      });
  
      it('debe devolver un error 500 si ocurre un problema interno', async () => {
        const mockError = new Error('Error interno');
        TweetService.prototype.getTweets.mockRejectedValue(mockError);
  
        await getTweets(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error al obtener tweets' });
      });
    });
  
    describe('createTweet', () => {
      it('debe crear un tweet y devolver status 201', async () => {
        const mockTweet = {
          _id: "6709d687f0c61b9feb9d74a6",
          content: "Este es un tweet de ejemplo",
          author: "66f079d9032c601977bd0236",
          likes: [],
          retweets: [],
          media: [{ type: "image", url: "https://ejemplo.com/imagen.jpg" }],
          createdAt: "2024-10-12T01:53:11.655Z",
        };
  
        TweetService.prototype.createTweet.mockResolvedValue(mockTweet);
  
        req.body = {
          content: "Este es un tweet de ejemplo",
          media: [{ type: "image", url: "https://ejemplo.com/imagen.jpg" }],
        };
  
        await createTweet(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockTweet);
      });
  
      it('debe devolver un error 400 si no se puede crear el tweet', async () => {
        const mockError = new Error('Error al crear tweet');
        TweetService.prototype.createTweet.mockRejectedValue(mockError);
  
        await createTweet(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
      });
    });
  
    describe('getTweetById', () => {
      it('debe devolver un tweet por ID con status 200', async () => {
        const mockTweet = {
          _id: "6702ca9001f349cc541499a4",
          content: "Este es un tweet de ejemplo",
          author: { _id: "66f079d9032c601977bd0236", username: "BrandelDev" },
        };
  
        TweetService.prototype.getTweetById.mockResolvedValue(mockTweet);
        req.params.id = '6702ca9001f349cc541499a4';
  
        await getTweetById(req, res);
  
        expect(TweetService.prototype.getTweetById).toHaveBeenCalledWith('6702ca9001f349cc541499a4');
        expect(res.json).toHaveBeenCalledWith(mockTweet);
      });
  
      it('debe devolver 404 si el tweet no existe', async () => {
        TweetService.prototype.getTweetById.mockResolvedValue(null);
  
        req.params.id = 'nonexistent_id';
        await getTweetById(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Tweet not found' });
      });
    });
  
    // Repite el patrón para updateTweet, deleteTweet, likeTweet, retweetTweet
    // Puedes usar los mismos mocks y estructura.
  
    // Por ejemplo:
    describe('deleteTweet', () => {
      it('debe eliminar un tweet y devolver status 204', async () => {
        TweetService.prototype.deleteTweet.mockResolvedValue();
  
        req.params.id = '6702ca9001f349cc541499a4';
        await deleteTweet(req, res);
  
        expect(res.status).toHaveBeenCalledWith(204);
      });
  
      it('debe devolver un error 400 si ocurre un error al eliminar', async () => {
        const mockError = new Error('Error al eliminar tweet');
        TweetService.prototype.deleteTweet.mockRejectedValue(mockError);
  
        await deleteTweet(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
      });
    });
  });
  