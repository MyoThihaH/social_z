import postMessage from '../../models/postMessage.js';

const posts = {
    Query: {
        postMessage: async () => {
            return await postMessage.find()
        }
    }
}

export default posts;