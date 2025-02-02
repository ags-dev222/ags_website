import { useState } from 'react';

function RegistrationForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { fullName, email, companyName });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Registration Details</h2>
        <button id="closeForm" className="text-gray-400 hover:text-red-600 font-bold text-xl">
          &times;
        </button>
      </div>
      <form id="registrationForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Enter your name"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your Email"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="Enter your Company"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </form>
    </div>
  );
}

function EventRegistrationForm() {
  const [country, setCountry] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { country, reminder });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="Ghana">🇬🇭 Ghana</option>
            <option value="Nigeria">🇳🇬 Nigeria</option>
            <option value="Kenya">🇰🇪 Kenya</option>
          </select>
        </div>
        <div>
          <label htmlFor="reminder" className="block text-sm font-medium text-gray-700">
            Reminder
          </label>
          <select
            id="reminder"
            value={reminder}
            onChange={(event) => setReminder(event.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option>A Day to the event</option>
            <option>A Week to the event</option>
            <option>On the Event Day</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">All your personal details will be stored and shared.</p>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}

const Forms = { RegistrationForm, EventRegistrationForm };
export default Forms;
