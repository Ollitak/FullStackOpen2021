dummy = (blogs) => {
    return 1
}

totalLikes = (blogs) => {
    likes = blogs.map(blog => blog.likes)
    return likes.reduce((acc, a) => acc + a, 0)
}

module.exports = {
    dummy,
    totalLikes
}