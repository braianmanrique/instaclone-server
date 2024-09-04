const userControllers = require('../controllers/user')
const { GraphQLUpload } = require('graphql-upload');  


const resolvers = {
    Upload: GraphQLUpload,
    Query: {
      getUser: (_, {id, username}) => userControllers.getUser(id, username)
    },
    Mutation: {
        register : (_, {input}) => userControllers.register(input),
        login : (_, {input}) => userControllers.login(input),
        updateAvatar: async (_, {file}) => userControllers.updateAvatar(file)

    }
}

module.exports = resolvers