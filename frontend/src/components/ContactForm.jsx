const ContactForm = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-black p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-30">Let&apos;s talk</h2>
            <p className="mb-6">
              Questions, comments, or suggestions? Simply fill in the form, and
              we&apos;ll be in touch shortly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-yellow-500"></i>
                <p>Accra Digital Center</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-yellow-500"></i>
                <p>+233 24 315 8077</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-yellow-500"></i>
                <p>Contact@moralizer.com</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-0.5">
                  Role in company
                </label>
                <select
                  id="role"
                  className="w-full p-3 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select role</option>
                  <option value="Executive Manager">Executive Manager</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter your message"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
