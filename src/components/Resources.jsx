import React from 'react';

function HeroSection() {
  return (
    <section className="bg-gray-800 text-white py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold">Resource Documents</h1>
        <p className="mt-2">Essential materials and tools to support your startup journey</p>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Overview</h2>
        <p className="mt-4 text-gray-600">Access a variety of templates, guides, and contracts designed to help you navigate the startup landscape.</p>
        <div className="mt-8">
          <video controls className="mx-auto rounded-md w-3/4 shadow-md">
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

function ResourceDocuments() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <HeroSection />
      <OverviewSection />
    </div>
  );
}

function DocumentSection() {
  const [isOpen, setIsOpen] = useState({});

  const handleToggle = (id) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center">General Download Document</h2>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">All Documents</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">Startup Files</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">For Investors</button>
          <button className="px-4 py-2 bg-gray-200 rounded-md">For Support Organization</button>
          </div>
        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="border rounded-md p-4">
              <button
                className="accordion-btn flex justify-between w-full"
                onClick={() => handleToggle(id)}
              >
                <span>Business Plan Template</span>
                <span>{isOpen[id] ? '-' : '+'}</span>
              </button>
              <div className={`accordion-content mt-2 ${isOpen[id] ? 'block' : 'hidden'}`}>
                <p className="text-gray-600">Description of the document goes here.</p>
              </div>
            </div>
          ))}
        </div>
        </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-green-500 text-white py-12">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
        <p className="mt-4">Get updates to our latest collection</p>
        <form id="newsletter-form" className="mt-6 flex justify-center">
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-md"
          />
          <button type="submit" className="px-4 py-2 bg-gray-800 rounded-r-md">
            Subscribe
          </button>
        </form>
      </div>
    </section>
    );
  }
  
  function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto flex justify-between">
          <div>
            <p>Lorem ipsum is simply dummy text.</p>
            <div className="mt-4 flex space-x-4">
              <a href="#">
                <img src="facebook-icon.png" alt="Facebook" />
              </a>
              <a href="#">
                <img src="twitter-icon.png" alt="Twitter" />
              </a>
              <a href="#">
                <img src="instagram-icon.png" alt="Instagram" />
              </a>
              </div>
        </div>
        <div>
          <h4 className="font-bold text-white">Company</h4>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white">Contact Us</h4>
          <p className="mt-4">+233 24 315 8017</p>
          <p>agsgha@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default Resouces;
