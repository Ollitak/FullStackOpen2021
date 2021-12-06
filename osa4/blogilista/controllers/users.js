const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')



usersRouter.post('/', async (request, response) => {
    logger.info("users post request")
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})


usersRouter.get('/', async (request, response) => {
    logger.info("users get request")
    const users = await User.find({})
    response.json(users)
})


module.exports = usersRouter
