import * as startupService from '../services/startup.js'


 export const createStartup = async (req, res)=>{
    try{
        const { name, sector, fundingStage, location, achievements }= req.body;
        const startup = await startupService.createStartup({ name, sector, fundingStage, location, achievements });
        res.status(201).json(startup);
    }catch(error){
        res.status(500).json({ message: error.mesage });
    }
 };


//getting startups based on their sector, fundingStage and location
 export  const getStartups = async (req, res ) =>{
    try{
        const { sector, fundingStage, location } = req.query;
        const filters = {};

        if (sector) filters.sector = sector;
        if (fundingStage) filters.fundingStage = fundingStage;
        if (location) filters.location = location;

        const startups =await startupService.getStartups(filters);
        res.status(200).json(startups);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
 };


 export const getStartupById = async (req, res) =>{
    try {
        const startup = await startupService.getStartupById(req.params.id);
        if(!startup) return res.status(404).json({ message: 'Startup not found'})
        res.status(200).json(startup);
 }catch (error){
    res.status(500).json( { message: error.message });
 }
};


export const updateStartup = async (req, res) =>{
    try {
        const updatedStartup = await startupService.updateStartup(req.params.id, req.body);
        if (!updatedStartup) return res.status(404).json({ message: 'Startup not found '});
        res.status(200).json(updatedStartup);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};


export const deleteStartup = async (req, res) => {
    try {
      const deletedStartup = await startupService.deleteStartup(req.params.id);
      if (!deletedStartup) return res.status(404).json({ message: 'Startup not found' });
      res.status(200).json({ message: 'Startup deleted successfully', deletedStartup });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };