import React from 'react';


function Header() {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="logo.png" alt="Logo" className="h-10" />
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-green-600">
              Explore
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              About
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="hidden md:block px-4 py-2 border rounded-lg"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Join
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-gray-100 py-16 text-center">
      <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">
          We’ve gotten an entire team dedicated to supporting startups,
          mentor, and investors.
        </h1>
        <p className="text-gray-600 mb-8">
          Explore the remarkable journey of AGS and Ghana Startup Week.
          Discover how we have empowered entrepreneurs, fostered innovation,
          and transformed the startup ecosystem in Ghana.
        </p>
        <img
          src="Rectangle 19307.png"
          alt="Team Photo"
          className="mx-auto rounded-lg"
        />
      </div>
    </section>
  );
}

function ExecutiveCard({ image, name, position, description, linkedin }) {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
      <div className="w-24 h-24 mb-4">
        <img src={image} alt={name} className="w-full h-full rounded-lg object-cover shadow" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">{position}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener"
        className="mt-4 px-4 py-2 bg-gray-100 text-gray-800 
        border border-gray-300 rounded-full flex items-center hover:bg-gray-200">
          <svg
          xmlns="(link unavailable)"
          fill="currentColor"
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
        >
          <path d="M22.23 0H1.77A1.78 1.78 0 000 1.77v20.46A1.78 1.78 0 001.77 24h20.46A1.78 1.78 0 0024 22.23V1.77A1.78 1.78 0 0022.23 0zM7.12 20.36H3.56V9h3.56zM5.34 7.59A2.08 2.08 0 013.2 5.34a2.07 2.07 0 012.14-2.24h.03A2.08 2.08 0 017.55 5.4a2.08 2.08 0 01-2.21 2.19zm14.56 12.77h-3.56v-5.63c0-1.34-.48-2.26-1.69-2.26a1.82 1.82 0 00-1.7 1.2 2.26 2.26 0 00-.11.81v5.88H9.67s.05-9.54 0-10.53h3.56v1.49a3.52 3.52 0 013.19-1.76c2.33 0 4.1 1.52 4.1 4.8z"></path>
        </svg>
        LinkedIn
      </a>
    </div>
  );
}

function OurExecutive() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Executive</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ExecutiveCard
            image="executive1.jpg"
            name="Mr. Solomon Adjei"
            position="President"
            description="Former Co-Founder at Xwp"
            linkedin="(link unavailable)"
          />
          <ExecutiveCard
            image="executive1.jpg"
            name="Mr. Solomon Adjei"
            position="President"
            description="Former Co-Founder at Xwp"
            linkedin="(link unavailable)" />

         <ExecutiveCard
            image="executive1.jpg"
            name="Mr. Solomon Adjei"
            position="President"
            description="Former Co-Founder at Xwp"
            linkedin="(link unavailable)" />

          <ExecutiveCard
            image="executive1.jpg"
            name="Mr. Solomon Adjei"
            position="President"
            description="Former Co-Founder at Xwp"
            linkedin="(link unavailable)"/>

          <ExecutiveCard
            image="executive1.jpg"
            name="Mr. Solomon Adjei"
            position="President"
            description="Former Co-Founder at Xwp"
            linkedin="(link unavailable)" />

        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Let’s Talk</h3>
          <p className="mb-4">Questions, comments, or suggestions? Simply fill in the form and we’ll be in touch shortly.</p>
          <p className="text-gray-400">Accra Digital Center</p>
          <p className="text-gray-400">+233 24 315 8017</p>
          <p className="text-gray-400">Contact@morailzer.com</p>
        </div>
        <form id="contact-form" className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 rounded-lg focus:outline-none text-black" />

          <input type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg focus:outline-none text-black" />
          <label htmlFor="role" className="sr-only">Role in company</label>
          <select id="role" className="w-full px-4 py-2 rounded-lg focus:outline-none text-black">
            <option>Role in company</option>
            <option>Executive Manager</option>
          </select>
          <textarea placeholder="Description" rows="4" className="w-full px-4 py-2 rounded-lg focus:outline-none text-black"></textarea>
          <button type="submit" className="w-48 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Send Message</button>
        </form>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <div className="bg-green-700 text-white text-center py-8 rounded-lg shadow-md">
      <h4 className="text-xl font-bold mb-4">Subscribe to our Newsletter to get Updates to our Latest Collection</h4>
      <form className="flex justify-center items-center space-x-4 max-w-xl mx-auto">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3 flex items-center text-white">
            <i className="fas fa-envelope"></i>
          </span>
          <input type="email" placeholder="Enter your email" className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800" />
        </div>
        <button type="submit" className="bg-white text-green-700 font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition">Subscribe</button>
      </form>
    </div>
     );
    }
    
    function FooterLinks() {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="logo.png" alt="Logo" className="h-12 mb-4" />
            <p className="text-gray-600">Lorem ipsum is simply dummy text of the print typeset industry.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-green-600" title="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600" title="Twitter">
                <i className="fab fa-twitter"></i>
                </a>
          <a href="#" className="text-gray-600 hover:text-green-600" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Company</h4>
        <ul>
          <li><a href="#" className="text-gray-600 hover:text-green-600">Home</a></li>
          <li><a href="#" className="text-gray-600 hover:text-green-600">About Us</a></li>
          <li><a href="#" className="text-gray-600 hover:text-green-600">Portfolio</a></li>
          <li><a href="#" className="text-gray-600 hover:text-green-600">Our Activities</a></li>
          </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Services</h4>
        <ul>
          <li><a href="#" className="text-gray-600 hover:text-green-600">Ghanastartup Week</a></li>
          <li><a href="#" className="text-gray-600 hover:text-green-600">About Us</a></li>
          <li><a href="#" className="text-gray-600 hover:text-green-600">Portfolio</a></li>
          <li><a href="#" className="text-gray-600 hover:text-green-600">Our Activities</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Contact Us</h4>
        <p className="text-gray-600">+233 24 315 8017</p>
        <p className="text-gray-600">agsgha@gmail.com</p>
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="text-center text-gray-600 mt-8">
      <p>Copyright 2023 | Powered by Association Of Ghana Startups | Developed By (link unavailable)</p>
    </div>
  );
}

export default AboutTeam;



    








