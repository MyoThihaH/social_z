import { UserInputError } from "apollo-server";
import Users from "../../models/users.js"
import { validateLoginInput } from "../../utils/validator.js";


const login = {
    Mutation :{
       async login(_,
            {loginInput: {email, password}},
            context,
            info,
            ) {
                const {validate, res, errors} = await validateLoginInput(email, password);
                
                if(validate){
                    return {
                        id: res.id,
                        username: res.username,
                        email: res.email,
                        createdAt: res.createdAt,
                        
                    }
                } else {
                    throw new UserInputError("Error",errors)
                }

                
            }
    }
}

export default login;