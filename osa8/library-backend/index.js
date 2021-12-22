const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const JWT_SECRET = 'SECRETSTRING'


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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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
      const books = await Book.find({})
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      return(root.books.length)
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
    addBook: async (root, args, context) => {  
      const currentUser = context.currentUser
      if (!currentUser) {
          throw new AuthenticationError("not authenticated")
      }

      try {
      const author = await Author.findOne({ name: args.author })
      // if authors do not yet include the newly added book author, let's put it in 
      if(!author){
        const newAuthor = new Author({ name: args.author })
        const book = new Book({ ...args, author: newAuthor._id })
        await newAuthor.save()

        // retreive the newly added author in order to add the book reference to it
        const newlyAddedAuthor = await Author.findOne({ name: args.author })
        newlyAddedAuthor.books = [book._id]
        await newlyAddedAuthor.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book.save(book)
      }
      // if author was found, just create new book and add the book id
      // to the corresponding author
      const book = new Book({ ...args, author: author._id })
      author.books = author.books.concat(book._id)

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      await author.save()
      return book.save(book)

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      const author = await Author.findOne({name: args.name})
      if(!author) return null
      // filter out the edited authors, create new author and concat it to the authors list
      author.born = args.setBornTo
      try {
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(e => {
          throw new UserInputError(e.message, { invalidArgs: args})
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})