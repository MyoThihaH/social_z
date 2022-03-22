import { ApolloServer } from 'apollo-server'; 
import mongoose from 'mongoose';

import { config } from './config.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import Users from './models/users.js';
// const allCourses = [
//     {
//         id:1,
//         name: 'react',
//         period: '2 month'
//     },
//     {
//         id:2,
//         name: 'Angular',
//         period: '3 month'
//     }
// ];

// const typeDefs = gql`
//     type Course {
//         id: Int!,
//         name: String!,
//         period: String!
//     }
//     type Query {
//         sayHi: String!,
//         allCourses: [Course]
//     }

// `;




const server = new ApolloServer({
    typeDefs,
    resolvers
});


const dbConnect =  async () => {
    try{
       await mongoose.connect(config.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
       const res = await server.listen({ port: 5000});
       console.log(res.url);

    } catch (err) {
       console.log(err.message);
    }
    
}

dbConnect();