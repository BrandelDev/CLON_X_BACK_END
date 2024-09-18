const posts = {
    "id": "123456",
    "user": {
      "id": "user_001",
      "username": "johndoe",
      "displayName": "John Doe",
      "avatarUrl": "https://example.com/avatar/johndoe.jpg"
    },
    "content": "Just had a great workout session! 💪 #fitness #healthyliving",
    "createdAt": "2024-08-10T14:30:00Z",
    "likesCount": 120,
    "retweetsCount": 45,
    "repliesCount": 10,
    "isLikedByCurrentUser": false,
    "isRetweetedByCurrentUser": false,
    "media": [
      {
        "type": "image",
        "url": "https://example.com/media/workout.jpg"
      }
    ],
    "replies": [
      {
        "id": "reply_001",
        "user": {
          "id": "user_002",
          "username": "janedoe",
          "displayName": "Jane Doe",
          "avatarUrl": "https://example.com/avatar/janedoe.jpg"
        },
        "content": "Great job! Keep it up!",
        "createdAt": "2024-08-10T15:00:00Z",
        "likesCount": 5,
        "isLikedByCurrentUser": true
      }
    ]
  }

const postList = (request, response)=>{
    response.json(posts)
}

module.exports = {
    postList
}