
import postsResolver from './posts.js';
import registerResolver from './register.js';
import login from './login.js';

const resolvers = {
    Query:{
        ...postsResolver.Query
    },
    Mutation: {
        ...registerResolver.Mutation,
        ...login.Mutation,
    }
};


export default resolvers;