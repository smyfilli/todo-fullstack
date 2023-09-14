const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const db = require('../db');
const {validationResult} = require('express-validator');
const {secret} = require('../config');

const generateAccessToken = (user)=>{
    const payload = {
        userId: user.id,
        username: user.username,
        userRole: user.role
      };
    
      // Set the token expiration time
      const expiresIn = '24h';
    
      // Sign the token
      const token = jwt.sign(payload, secret, { expiresIn });
    
      return token;
}

class authController{
    async registration(req, res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Ошибка при регистрации", errors})
            }
            const { name, surname, login, password } = req.body;

            // Check if the user already exists
            const existingUser = await db.query('SELECT * FROM "User" WHERE login = $1', [login]);

            if (!existingUser) {
                return res.status(400).json({message: 'User allready exist'})
            }

            
            // Hash the user's password
            const hashedPassword = bcrypt.hashSync(password, 7);
            const userRole = "USER"
            // Create a new user
            const newUser = await db.query(`INSERT INTO "User" (name, surname, login, password, role) values ($1, $2,$3,$4, $5) RETURNING *`, [name, surname, login, hashedPassword, userRole])

            return res.json({ message: 'User registered successfully' });
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try {
            const {login,password} = req.body;
            const user = await db.query('SELECT * FROM "User" WHERE login = $1', [login]);

            if (!user) {
                return res.status(400).json({message: `Пользователь ${login} не найден`})
            }

            //Checking if the password is correct
            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if(!validPassword){
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            //Token generation
            const token = generateAccessToken(user.rows[0])
            return res.json(token)

        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            const users = await db.query('SELECT * FROM "User"');
            res.json(users.rows)
        } catch (error) {
            
        }
    }
}

module.exports = new authController()