const express = require('express');
const authRoutes = require('./auth/auth.routes');
const randomRoutes = require('./randoms/randoms.router');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { getProducts, createProduct } = require('../../controllers/graph.controller');

//Routes
router.use('/auth', authRoutes);
router.use('/randoms', randomRoutes);

//rutas por GraphQL

const schema = buildSchema(`
  type Product {
    id: ID!,
    title: String,
    price: String,
    thumbnail: String
  }

  input ProductInput {
    title: String,
    price: String,
    thumbnail: String
  }

  type Query {
    getProducts: [Product]
  }

  type Mutation {
    createProduct(data: ProductInput): Product
  }
`);


router.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        getProducts,
        createProduct
    },
    graphiql: true
}));

module.exports = router;
