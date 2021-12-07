const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')


// GET ALL
blogsRouter.get('/', async (request, response) => {
    logger.info("get request")
    const blogsFound = await Blog.find({}).populate('user')
    response.json(blogsFound)
})



// POST
blogsRouter.post('/', async (request, response, next) => {
  logger.info("post request")

  const body = request.body

  const token = request.token

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch(e) {
    next(e)
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(!request.body.likes){
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    // Tässä en saanut materiaalin esimerkkiä toimimaan metodin .save()
    // avulla - sovellus heitti "id must be unique" -tyyppisen errorin.
    // Liittynee siis siihen, että save() komennolla lisätään kantaan
    // uusi dokumentti, kun nyt tarkoitus oli päivittää vanhaa. Tästä
    // syystä käytin findIdandUpdate()-metodia, jolla näyttäisi toimivan
    // hyvin. En kylläkään tiedä miksi materiaalissa oli toiminut Savella?...
    await User.findByIdAndUpdate(user._id, user, {new: true})
    response.status(201).json(result)
  } catch(e) {
    next(e)
  }
})

// REMOVE ONE
blogsRouter.delete('/:id', async (request, response, next) => {
  logger.info("delete request")

  const token = request.token

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch(e) {
    next(e)
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // Haetaan lähettänyt käyttäjä
  const user = await User.findById(decodedToken.id)

  try {
    // Haetaan poistettava blogi id-polkuparametrin avulla
    const blogToBeDeleted = await Blog.findById(request.params.id)
    if(blogToBeDeleted){
      // Tarkastetaan vastaako poistettavan blogin lähettäjä poistoehdotuksen lähettäjää
      if(blogToBeDeleted.user.toString() != user._id.toString()){
        logger.info("Tried to delete someone elses blog")
        return response.status(401).json({ error: 'token not corresponding the original poster' })
      } else {
        const deleted = await Blog.findByIdAndDelete(request.params.id)   
        logger.info("succesfully deleted")
        response.status(204).end()
      }
  } else {
    logger.info("id not found - returning 400")
    response.status(400).end()
  }
}
  catch(e) {
    next(e)
  }
})

// CHANGE ONE
blogsRouter.put('/:id', async (request, response, next) => {
  logger.info("put request")
  try {
    const updatedBlog = 
      await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true})
    response.json(updatedBlog)

  } catch(e) {
    next(e)
  }
})



module.exports = blogsRouter
