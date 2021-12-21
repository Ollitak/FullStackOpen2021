const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack12345@cluster0.rry4z.mongodb.net/graphql?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      // if no author or genre inputs are given
      if(!args.author && !args.genre) return books
      // if only author input is given
      if(!args.genre) return books.filter(b => b.author === args.author ? true : false)
      // if only genre input is given
      if(!args.author) return books.filter(b => b.genres.includes(args.genre) ? true : false)
      // if both inputs are given
      authorFilterBooks = books.filter(b => b.author === args.author ? true : false)
      genreAndAuthorFilteredBooks = authorFilterBooks.filter(b => b.genres.includes(args.genre) ? true : false)
      return genreAndAuthorFilteredBooks
    },
    allAuthors: async (root, args) => {
      return await Author.find({})
    }
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },

  Book: {
    author: async (root) => { 
      // root.author on nyt authorin id
      const author =  await Author.findOne({_id: root.author})
      return author
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      // if authors do not yet include the newly added book author,
      // let's put it in
      const author = await Author.findOne({ name: args.author })
      if(!author){
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        const book = new Book({ ...args, author: newAuthor._id })
        return book.save(book)
      }
      const book = new Book({ ...args, author: author._id })
      return book.save(book)

    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if(!author) return null
      // filter out the edited authors, create new author and concat it to the authors list
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})