const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
{
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 7
}
]


beforeEach(async () => {
  await Blog.deleteMany({})
  let firstBlog = new Blog(initialBlogs[0])
  await firstBlog.save()
  let secondBlog = new Blog(initialBlogs[1])
  await secondBlog.save()
})


// JSON muodon testaus
test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
// Oikean palautusmäärän testaus
test('right amount of blogs in the database', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(initialBlogs.length)


})




afterAll(() => {
  mongoose.connection.close()
})