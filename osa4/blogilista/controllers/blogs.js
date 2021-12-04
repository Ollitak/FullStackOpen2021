const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
    logger.info("/api/blogs get request")
    const blogsFound = await Blog.find({})
    response.json(blogsFound)
})

blogsRouter.post('/', async (request, response, next) => {
  if(!request.body.likes){
    request.body.likes = 0;
  }
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter
