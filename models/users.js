import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    createdAt: {type: String},
});

const Users = mongoose.model('Users',usersSchema);

export default Users;