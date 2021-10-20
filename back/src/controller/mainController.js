const bcrypt = require('bcryptjs');
const fs = require('fs')
const path = require('path');
const axios = require('axios').default;
const jwt = require('jsonwebtoken');

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// nb 
// uml
// manejo de error 

module.exports = {

    // ---------------- servicio de login ----------------
    login: async  (req, res) => {

        var user = null
        var password = false
        // se recorre la "base de datos" y se busca un usuario que coincida con el que llega desde el front, de ser encontrado, compara las contraseñas usando el metodo de la libreria bcrypt, para comparar contraseñas hasheadas sin revertir el proceso. en caso de encontrar el usuario se le reasigna el valor a la variable de la linea 17, con el usuario encontrado. Si se compara la contraseña se manera exitosa, el valor de la variable de la linea 18 pasa a ser verdadero. 
        for(let i = 0 ; i < users.length ; i ++){
            if(users[i].email == req.body.email){
                user = users[i]
                if(bcrypt.compareSync(req.body.password, users[i].password)){
                    password = true
                }
            }     
        }
        // si se encontro un usuario, preguntar por la contraseña, si ambas son correctas se inicia la sesion y se crea el token, si solo el usuario es correcto se le envia un mensaje al front de que la contraseña es correcta. si no hay usuario, se le envia mensaje de que no se encontro usuario. 
        if(user){
            if(password){
                const id = user.id
                const token = jwt.sign({id}, "jwtSecret", {
                    expiresIn: 300
                })
                res.json({message:"Success", auth: true, token: token, user:user})
            } else {
                res.json({error: "Incorrect Credentials", auth:false})
            }
        } else {
            res.json({error: "User Not Found", auth:false})
        }
    },
    // ---------------- servicio de autenticacion de usuario ----------------
    authentication: (req, res) => {
        res.json({message:'User Authenticated', auth:true})
    },
    // ---------------- busqueda a la API Posts ----------------
    fetchPosts: async (req, res) => {
        try {
            return await axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                return res.data
            })
            .then(data => {
                res.json(data)
            })
          } catch (error) {
            console.error(error)
          }
    }, 
    // ---------------- busqueda a la API Photos ----------------
    fetchPhotos : async (req, res) => {
        try {
            return await axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(res => {
                return res.data
            })
            .then(data => {
                res.json(data)
            })
          } catch (error) {
            console.error(error)
          }
    }
}