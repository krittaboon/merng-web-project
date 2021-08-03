const { ApolloServer } = require('apollo-server');
// config graphQL query
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers')

const mongoose = require('mongoose');

// connection string from config file and commit to git
const { MONGODB } = require('./config.js');

const PORT = process.env.port || 5000;
//server side action

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(
        () => {
            console.log("MongoDB connected")
            return server.listen({ port: PORT });
        }
    ).then(res =>
        console.log(`Server running at ${res.url}`)
    ).catch(err => {
        console.error(err)
    })


