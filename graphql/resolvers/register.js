import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../../models/users.js';
import { config } from '../../config.js';
import { validateRegisterInput, validateLoginInput } from '../../utils/validator.js';
import { UserInputError } from 'apollo-server';

const registerResolver = {
    Mutation: {
       async register(_,
                {registerInput: {username, email, password, confirmPassword}}, 
                context, 
                info) {
                    const { errors, valid } = await validateRegisterInput(username, email, password, confirmPassword);
                    
                     if(!valid) 
                        throw new UserInputError("Errors",errors)
                    
                     
                    password = await bcrypt.hash(password, 12);
                    
                    const newUser = Users({
                        username,
                        email,
                        password,
                        createdAt: new Date().toISOString()
                    });

                    const res = await newUser.save();
                    const token = jwt.sign({
                                    id: res.id,
                                    email: res.email,
                                    username: res.username,
                                },
                                config.SECRET,
                                { expiresIn: '1h' },
                                )
            return {
                ...res._doc,
                id: res._id,
                token,
            }

        }
    }
}

export default registerResolver;