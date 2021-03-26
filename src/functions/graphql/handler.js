const { ApolloServer } = require('apollo-server-lambda');
const config = require('./config');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const findMovies = require('../../components/dynamodb/querys/find-movies');

require('dotenv/config');

const server = new ApolloServer({
  playground: {
    endpoint: '/dev/ghiblidb/graphql',
  },
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      config,
      findMovies,
    };
  },
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});