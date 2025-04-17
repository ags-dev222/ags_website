
import * as InvestorService from '../services/investorService.js';

export const createInvestor = async (req, res) => {
  try {
    const investor = await InvestorService.createInvestor(req.body);
    res.status(201).json(investor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getInvestors = async (req, res) => {
  try {
    const filters = req.query;
    const investors = await InvestorService.getInvestors(filters);
    res.status(200).json(investors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getInvestorById = async (req, res) => {
  try {
    const investor = await InvestorService.getInvestorById(req.params.id);
    if (!investor) return res.status(404).json({ error: 'Investor not found' });
    res.status(200).json(investor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInvestor = async (req, res) => {
  try {
    await InvestorService.deleteInvestor(req.params.id);
    res.status(200).json({ message: 'Investor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDashboardMetrics = async (req, res) => {
  try {
    const metrics = await InvestorService.getDashboardMetrics();
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const exportInvestors = async (req, res) => {
  try {
    const csv = await InvestorService.exportInvestorsToCSV(req.query);
    res.header('Content-Type', 'text/csv');
    res.attachment('investors.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
