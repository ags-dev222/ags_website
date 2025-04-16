import { createStartupService, getStartupsService, getStartupByIdService, updateStartupService, deleteStartupService } from '../services/startupService.js'; 

// Create a new startup
export const createStartup = async (req, res) => {
  const { name, sector, fundingStage, location, foundedYear, region, website, achievements, status, founders, socialMedia } = req.body;
  try {
    const newStartup = await createStartupService({ name, sector, fundingStage, location, foundedYear, region, website, achievements, status, founders, socialMedia });
    res.status(201).json({ message: 'Startup created successfully', startup: newStartup });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all startups
export const getAllStartups = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values
  try {
    const startups = await getStartupsService({}, page, limit);
    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch startups' });
  }
};

// Get a startup by ID
export const getStartupById = async (req, res) => {
  try {
    const startup = await getStartupByIdService(req.params.id);
    if (!startup) return res.status(404).json({ error: 'Startup not found' });
    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch startup' });
  }
};

// Update an existing startup
export const updateStartup = async (req, res) => {
  const { id } = req.params;
  const { name, sector, fundingStage, location, foundedYear, region, website, achievements, status, founders, socialMedia } = req.body;
  try {
    const updatedStartup = await updateStartupService(id, { name, sector, fundingStage, location, foundedYear, region, website, achievements, status, founders, socialMedia });
    res.status(200).json({ message: 'Startup updated successfully', startup: updatedStartup });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a startup
export const deleteStartup = async (req, res) => {
  try {
    await deleteStartupService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
