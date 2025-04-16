import { Parser } from 'json2csv';

const exportToCSV = (data) => {
  const fields = ['name', 'location', 'supportRound', 'dealSize', 'totalSupport', 'numberOfSupportedStartups', 'topSupportedStartups'];
  const opts = { fields };
  
  try {
    const parser = new Parser(opts);
    return parser.parse(data.map(item => item.toObject()));
  } catch (err) {
    throw new Error('Error generating CSV');
  }
};

export default exportToCSV;
