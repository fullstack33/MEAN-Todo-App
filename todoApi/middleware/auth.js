const jwt = require('jsonwebtoken')
module.exports = function verifyToken(req, res, next){
    console.log(req.headers);
    if(!req.headers.authorization){
        return res.status(401).send({message: "Unauthorized request"});
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === null){
        return res.status(401).send({message: "Unauthorized request"});
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send({message: "Unauthorized request"});
    }
    console.log(payload);
    res.send(payload);
    req.userId = payload.subject;
    next()
}
