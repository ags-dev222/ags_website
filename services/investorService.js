// services/investorService.js
import Investor from '../models/Investor.js';
import exportToCSV from '../utils/exportToCSV.js';

export const createInvestor = async (data) => {
  return await Investor.create(data);
};

export const getInvestors = async (filters) => {
  const query = {};

  if (filters.location) query.location = filters.location;
  if (filters.supportRound) query.supportRound = filters.supportRound;
  if (filters.dealSize) query.dealSize = filters.dealSize;

  return await Investor.find(query);
};

export const getInvestorById = async (id) => {
  return await Investor.findById(id);
};

export const deleteInvestor = async (id) => {
  return await Investor.findByIdAndDelete(id);
};

//TODO: retrieve all dashboard metrics instead of total i nvestors and totalFunding. 
export const getDashboardMetrics = async () => {
  const totalInvestors = await Investor.countDocuments();
  const totalFunding = await Investor.aggregate([
    { $group: { _id: null, total: { $sum: '$totalSupport' } } }
  ]);

  return {
    totalInvestors,
    totalFunding: totalFunding[0]?.total || 0,
  };
};

export const exportInvestorsToCSV = async (filters) => {
  const investors = await getInvestors(filters);
  return exportToCSV(investors);
};
