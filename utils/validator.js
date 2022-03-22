import bcrypt from 'bcrypt';

import Users from "../models/users.js";

export const validateRegisterInput = async (
    username,
    email,
    password,
    confirmPassword,
) => {
    const errors = {};
    
    if(username.trim()===""){
        errors.username = "Username must not be empty";
    }

    if(email.trim()===""){
        errors.email = "Email must not be empty";
    } else {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email.match(regex)) {
            errors.email = "Email must be a valid email address";
        } else if(await Users.findOne({email:email})){
            errors.email = "Email is already use";
        }
    }

    if(password.trim() === ""){
        errors.password = "Password must not be empty";
    } else if(password !== confirmPassword) {
        errors.confirmPassword = "Password must match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}


export const validateLoginInput = async (email, password) => {
    const errors = {};

    if(email.trim() == "") {
        errors.email = "Email must not be empty";
    } else {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email.match(regex)) {
            errors.email = "Email must be a valid email address";
        }
    }
   
    const res = await Users.findOne({email:email});
    if(res){
    const passValidate = await bcrypt.compare(password,res.password);

    if(!passValidate) {
        errors.password = "Password Wrong!";
    }
}


    if(Object.keys(errors).length < 1) {
        return {
            validate: true,
            res,
        }
    } else {
        return {
            validate: false,
            errors,
        }
    }




    
} 