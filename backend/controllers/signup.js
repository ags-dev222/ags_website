import * as SignupService from '../services/signup.js';

//create a signup
export const createSignup = async (req, res) =>{
    try {
        const { name, email, industry, fundingStage, reasonForSignup }= req.body;
        const newSignup = await SignupService.createSignup({
            name,
            email,
            industry,
            fundingStage,
            reasonForSignup,
        });
        res.status(201).json(newSignup);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};


//Get all signups based on industries or funding stage
export const getSignups = async (req, res ) =>{
    try{
        const { industry, fundingStage } = req.query;
        const filters= {};

        if(industry) filters.industry = industry; 
        if(fundingStage) filters.fundingStage = fundingStage;
        
        const signups = await SignupService.getSignups(filters);
        res.status(200).json(signups);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

//Get a signup by ID
export const getSignupById = async (req, res) =>{
    try {
        const signup = await SignupService.getSignupById(req.params.id);
        if(!signup) return res.status(404).json({ message: 'Signup not found '});
        res.status(200).json(signup);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};


//Delete a signup
export const deleteSignup = async (req, res) =>{
    try {
        const deletedSignup = await SignupService.deleteSignup(req.params.id);
        if(!deletedSignup) return res.status(404).json({ message: 'Signup not deleted '});
        res.status(200).json({ message: 'Signup deleted successfully '});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};