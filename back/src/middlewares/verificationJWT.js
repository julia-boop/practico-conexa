const jwt = require('jsonwebtoken');
// ---------------- Verificacion de Token ----------------
// busca un token que llegue desde el front, en caso de haberlo, hace uso del metodo verify de la libreria JWT para chequear que el usuario haciendo el pedido desde la api sea el mismo que inicio sesion
// middleare que se usa en la ruta /userAuth

const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
    
    if(!token){
        res.json({message:"User Not Authenticated"})
    } else {
        jwt.verify(token, "jwtSecret", (e, decoded) => {
            if(e){
                res.json({auth:false, message: "Authentication Failed"})
            } else {
                req.userId = decoded.id

            }
        })
    }
    next()

}

module.exports = verifyJWT