const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')



// Get all registered users in the DB -- Obter todos os usuários cadastrados na DB
router.get('/', async (req, res) => {
    const users = await User.find({}, {name: 1, email: 1, _id: 1})
    res.status(200).send(users)
})

// Create a new User -- Criar um novo usuário
router.post('/register', async (req, res) => {

    // Validate the data before making a new user -- Validar os dados antes de criar um novo usuário
    const {error} = registerValidation(req.body)
    if(error) return res.sendStatus(400)

    // Check if the user is already in the database -- Checar se o usuário já está na DB
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.sendStatus(409)

    // Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Instantiate a new User -- Instanciar um novo usuário
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    // Try/catch to save the new user in the DB or send the error -- Try/catch para salvar o novo usuário na DB ou enviar o erro
    try {
        await user.save()
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
})




// Login
router.post('/login', async (req, res) => {

    // Validate the data before making a new user
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Check if the user is already in the database
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('This email is not registered')

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password!')

    // Create and assign the JSON Web Token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
    res.header('auth-token', token).status(201).json(token)
})

module.exports = router