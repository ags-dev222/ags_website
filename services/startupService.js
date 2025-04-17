import mongoose from "mongoose";
import Startup from "../models/Startup.js";

export const createStartupService = async (data) => {
  try {
    const newStartup = new Startup(data);
    await newStartup.save();
    return newStartup;
  } catch (error) {
    throw new Error(`Error creating startup: ${error.message}`);
  }
};

export const getStartupsService = async (filters = {}, page = 1, limit = 10) => {
  try {
    const startups = await Startup.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Startup.countDocuments(filters);
    return { startups, total, page, limit };
  } catch (error) {
    throw new Error(`Error fetching startups: ${error.message}`);
  }
};


export const getStartupByIdService = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    const startup = await Startup.findById(id);
    if (!startup) throw new Error("Startup not found");
    return startup;
  } catch (error) {
    throw new Error(`Error fetching startup: ${error.message}`);
  }
};

export const updateStartupService = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    const updatedStartup = await Startup.findByIdAndUpdate(id, data, { new: true });
    if (!updatedStartup) throw new Error("Startup not found");
    return updatedStartup;
  } catch (error) {
    throw new Error(`Error updating startup: ${error.message}`);
  }
};

export const deleteStartupService = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    const deletedStartup = await Startup.findByIdAndDelete(id);
    if (!deletedStartup) throw new Error("Startup not found");
    return deletedStartup;
  } catch (error) {
    throw new Error(`Error deleting startup: ${error.message}`);
  }
};
