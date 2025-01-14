import Startup from "../models/Startup.js";

export const createStartup = async (data) =>{
    const newStartup = new Startup(data);
    await newStartup.save()
    return newStartup;
};

export const getStartups = async (filters) =>{
    const startups = await Startup.find(filters);
    return startups;
}; 

export const getStartupById = async (id)=>{
    const startup = await Startup.findById(id);
    return startup;
};

export const updateStartup = async (id, data) =>{
    const updatedStartup = await Startup.findByIdAndUpdate(id, data, { new: true});
    return updatedStartup;
}

//modify 
export const deleteStartup = async (id)=>{
    const deletedStartup = await Startup.findByIdAndDelete(id);
    return deletedStartup;
}
