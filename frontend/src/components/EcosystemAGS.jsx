import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function HeroSection() {
  return (
    <section className="text-center py-16 px-4 bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
        We’ve gotten an entire team dedicated to supporting startups, mentor and investors.
      </h1>
      <p className="text-lg text-gray-600 mt-4">
        Explore the remarkable journey of AGS and Ghana Startup Week. 
        Discover how we have empowered entrepreneurs, fostered innovation, and transformed the startup ecosystem in Ghana.
      </p>
    </section>
  );
}

function AdvisorySection() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-center text-2xl md:text-4xl font-bold text-gray-800">
        national ex.<br />regional leads<br />Advisory board
      </h2>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Subscribe button clicked:', email);
  };

  return (
    <section className="py-16 px-4 bg-green-100 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Subscribe to our Newsletter to get Updates to our Latest Collection
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center space-x-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded bg-white border border-gray-300"
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Subscribe
        </button>
      </form>
    </section>
  );
}


function EcosystemAGS() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AdvisorySection />
      <NewsletterSection />
      <div className="content">
        {/* Your existing content */}
        <ul>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Ghana Startup Week
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Our Activities
            </a>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default EcosystemAGS;