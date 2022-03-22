import gql from 'graphql-tag';

const typeDefs = gql `
    type Message {
        id: ID,
        title: String,
        message: String,
        creator: String,
        selectedFile: String,
        likeCount: Int,
        createdAt: String

    }
    type Query {
        postMessage: [Message]
    }

    input RegisterInput {
        username: String,
        password: String,
        confirmPassword: String,
        email: String
    }

    input LoginInput {
        email: String,
        password: String,
    }

    type User {
        id: ID,
        email: String,
        token: String,
        username: String,
        createdAt: String,
    }

    type Mutation {
        register(registerInput: RegisterInput): User
    }

    type Mutation {
        login(loginInput: LoginInput): User
    }
`;

export default typeDefs;