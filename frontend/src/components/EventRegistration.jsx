import NavbarDark from "./NavbarDark";
import { useState } from "react";
import EventRegistrationForm from "./EventRegistrationForm";

function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { fullName, email, companyName });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-26">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-bold">Registration Details</h2>
          <button className="text-gray-500 hover:text-red-600 text-2xl font-bold">
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 block w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-green-500 focus:border-green-500"
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
              className="mt-1 block w-full px-4 py-3 border rounded-lg bg-gray-100 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Include Event Registration Form */}
          <EventRegistrationForm />
          <NavbarDark />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 px-4 rounded-lg hover:bg-green-800 focus:ring-2 focus:ring-green-500 text-lg font-medium"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
