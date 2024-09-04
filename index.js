const mongoose = require("mongoose");
// const {  ApolloServer} = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");  // Cambiar a "apollo-server-express"

const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
const cors = require('cors');  // Importar el paquete cors
  

const express = require('express');
const { graphqlUploadExpress } = require('graphql-upload');

require("dotenv").config({path: ".env"});



async function connectDB() {
    try {
      await mongoose.connect(process.env.BBDD);
      console.log('Conexión exitosa a la base de datos');
      startServer();  
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }
  
  connectDB();

  async function startServer(){
    const app = express();

    app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
  }));

    app.use(graphqlUploadExpress()); 

    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers
    });
    // await serverApollo.listen().then(({url}) => {
    //     console.log(`Server ready on : ${url}`)
    // })

    await serverApollo.start();
    serverApollo.applyMiddleware({app, path: '/graphql'});

    app.listen({port:4000}, ()=>{
      console.log(`🚀Server ready on : http://localhost:4000${serverApollo.graphqlPath}`);
    });
  }