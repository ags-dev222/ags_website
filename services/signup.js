/**create signup, get signups, getsignups by id and delete signups */

import Signup from "../models/signup.js";

//create a signup
export const createSignup = async (data) =>{
    const newSignup = new Signup(data);
    await newSignup.save();
    return newSignup;
};

//Get all signups or ilter by criteria
export const getSignups = async (filters) =>{
    const signups = await Signup.find(filters);
    return signups;
};

//Get signups by ID
export const getSignupById = async (id)=>{
    const signup = await Signup.findById(id);
    return signup;
};

//delete signups
export const deleteSignup = async (id)=> {
const deletedSignup = await Signup.findByIdAndDelete(id);
return deletedSignup;
};





