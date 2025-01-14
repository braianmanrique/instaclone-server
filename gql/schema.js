const {gql} = require("apollo-server");

const typeDefs = gql`
    scalar Upload 
    type User {
    id: ID
    name : String
    username: String
    email: String
    siteWeb: String
    description: String
    avatar: String
    password: String
    createAt: String
    }
    
    type Token{
        token: String
    }

    type UpdateAvatar{
        status: Boolean
        urlAvatar: String
    }

    input UserInput {
        name:String!
        username: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Query{
        # User
       # getUser: User
       getUser(id: ID, username: String):User
    }

    type Mutation{
        #User
        register(input: UserInput) : User
        login(input:LoginInput) : Token
        updateAvatar(file: Upload) : UpdateAvatar
    }
`;

module.exports = typeDefs;