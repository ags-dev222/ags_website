function HeroSection() {
  return (
    <section className="text-center py-16 px-4 bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
        We’ve gotten an entire team dedicated to supporting startups, mentor and investors.
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Explore the remarkable journey of AGS and Ghana Startup Week. Discover how we have empowered entrepreneurs, fostered innovation, and transformed the startup ecosystem in Ghana.
      </p>
    </section>
  );
}

function AdvisorySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Advisory Board</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our advisory board consists of experienced professionals who provide guidance and support to our startups.
        </p>
        {/* Add advisory board members here */}
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
        <form className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">Our Contact Information</h2>
        <p className="text-lg text-gray-600 mt-4">
          You can reach us at the following address and contact numbers.
        </p>
        {/* Add contact information here */}
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800">Subscribe to our Newsletter</h2>
        <p className="text-lg text-gray-600 mt-4">
          Get updates on our latest activities and events.
        </p>
        <form className="mt-8 space-y-4">
          <div>
            <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="newsletter-email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function AboutMissionVission() {
  return (
    <div>
      <HeroSection />
      <AdvisorySection />
      <ContactForm />
      <ContactInfo />
      <NewsletterSection />
    </div>
  );
}

export default AboutMissionVission;
