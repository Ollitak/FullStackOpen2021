const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// GET ALL
blogsRouter.get('/', async (request, response) => {
    logger.info("get request")
    const blogsFound = await Blog.find({})
    response.json(blogsFound)
})

// POST
blogsRouter.post('/', async (request, response, next) => {
  logger.info("post request")
  if(!request.body.likes){
    request.body.likes = 0;
  }
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(e) {
    next(e)
  }
})

// REMOVE ONE
blogsRouter.delete('/:id', async (request, response, next) => {
  logger.info("delete request")
  try {
    const deleted = await Blog.findByIdAndDelete(request.params.id)
    if(deleted){
      response.status(204).end()
    } else {
      logger.info("id not found - returning 400")
      response.status(400).end()
    }
  } catch(e) {
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
