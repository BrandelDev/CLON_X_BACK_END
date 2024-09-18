const Follow = [
    {
    "userid": "53645",
    "user": "daniel.10",
    "password":"123456789"
    },
    ]


const Followcontroller = (request, response)=>{
    response.json(Follow)
}

module.exports = {
    Followcontroller,
}