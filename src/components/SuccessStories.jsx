import React from 'react';

function HeroSection() {
  return (
    <section
      className="relative bg-black text-black py-16 px-4 sm:px-8 md:px-16 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: 'url(Rectangle 3932.png)',
      }}
    >
      <div className="container mx-auto max-w-screen-xl flex items-center">
        <div>
          <h1 className="text-4xl font-bold">Our Impact & Success Stories</h1>
          <p className="mt-4">
            Explore the remarkable journey of AGS and Ghana Startup Week. Discover how we have empowered entrepreneurs, fostered innovation, and transformed the startup ecosystem in Ghana.
          </p>
          </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <HeroSection />
    </div>
  );
}

function Milestones() {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold">{props.title}</h3>
      <p className="mt-2">{props.description}</p>
    </div>
  );
}

function MilestonesSection() {
  const milestones = [
    { title: 'Entrepreneurs Supported', description: 'Over 500+ startups nurtured and guided.' },
    { title: 'Funds Raised', description: '$2 million+ in funding secured for startups.' },
    { title: 'Events Conducted', description: '100+ workshops, panels, and networking events.' },
    { title: 'Mentorship', description: '$2 million+ in funding secured for startups.' },
  ];

  return (
    <div className="flex flex-col space-y-6 text-center lg:text-left">
      {milestones.map((milestone, index) => (
        <Milestones key={index} title={milestone.title} description={milestone.description} />
      ))}
    </div>
  );
}

function ImageSection() {
  return (
    <div className="flex-shrink-0 mb-8 lg:mb-0 lg:mr-8">
      <img
        src="Rectangle 3967.png"
        alt="Milestones visual representation"
        className="w-80 h-80 object-cover rounded-md shadow-md"/>
        </div>
  );
}

function Section() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center">
        <ImageSection />
        <MilestonesSection />
      </div>
    </section>
  );
}

function SuccessStories() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center">Success Stories</h2>
        <div className="mt-8 md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <video controls className="w-full rounded-md shadow-md">
              <source src="Rectangle 3954.png" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex-1">
            <p className="text-gray-600">
              In 2022, AGS partnered with TechInnov to provide affordable digital education solutions across Africa.
              They secured $500,000 in seed funding and expanded their platform to five countries.
            </p>
            </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <div className="relative max-w-lg mx-auto">
          {/* Stack 1 */}
          <div className="absolute inset-0 transform translate-y-8 bg-white shadow-md rounded-md"></div>
          {/* Stack 2 */}
          <div className="absolute inset-0 transform translate-y-4 bg-white shadow-md rounded-md"></div>
          {/* Stack 3 */}
          <div className="relative p-6 bg-white shadow-md rounded-md">
            {/* Content Wrapper (Flex Container) */}
            <div className="flex items-center justify-center space-x-4">
              {/* Text Content */}
              <div className="text-center">
                <p className="text-gray-600">  "Lorem ipsum is simply dummy text of the print typesetting industry. Lorem ipsum dummy."
                </p>
                <h4 className="mt-4 text-lg font-bold">Carolyn Kwame</h4>
                <p className="text-sm text-gray-500">Marketing Director, Nokofio</p>
              </div>
              {/* Picture */}
              <img
                src="Rectangle 3930.png"
                alt="Profile picture of Carolyn Kwame"
                className="w-40 h-40 rounded-lg border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="bg-green-500 text-white rounded-3xl py-12">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
        <p className="mt-4">Get updates on our latest collection</p>
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
    
    function App() {
      return (
        <div>
          <SuccessStories />
          <Testimonial />
          <NewsletterSection />
        </div>
      );
    }
    
    export default SuccessStories;
    





