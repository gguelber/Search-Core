// Validation using Joi -- Validação utilizando o Joi
const Joi = require('@hapi/joi')

// Register Validation -- Validação do cadastro
const registerValidation = data => {
    const schema = {
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}

//Login Validation -- Validação do login
const loginValidation = data => {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation