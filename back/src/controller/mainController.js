const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs')
const path = require('path');
const axios = require('axios').default;

const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


module.exports = {
    login: async  (req, res) => {

        var user = null
        var password = false

        for(let i = 0 ; i < users.length ; i ++){
            if(users[i].email == req.body.email){
                user = users[i]
                if(bcrypt.compareSync(req.body.password, users[i].password)){
                    password = true
                }
            }     
        }

        if(user){
            if(password){
                res.json({message:"Sesion iniciada con exito"})
            } else {
                res.json({error: "Contraseña incorrecta"})
            }
        } else {
            res.json({error: "Usuario no encontrado"})
        }
    },
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