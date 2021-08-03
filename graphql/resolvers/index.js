const postResolvers = require('./posts')
const usersResolvers = require('./users');
const commentResolvers = require('./comments')

//we can modify feild that we assign in typedefs it run every time the mutation run!
//ex. likeCount commentCount

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query,
        ...commentResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },


}
