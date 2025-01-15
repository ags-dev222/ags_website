import PropTypes from 'prop-types';

function HeroSection() {
  return (
    <section
      className="relative bg-gray-800 text-white py-16 px-4 sm:px-8 md:px-16 bg-cover bg-no-repeat bg-top"
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

Milestones.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

function Milestones(props) {
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
    { title: 'Mentorship', description: 'Experienced mentors providing guidance.' },
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
        className="w-80 h-80 object-cover rounded-md shadow-md"
      />
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

function Testimonial() {
  return (
    <section className="py-16 px-4 bg-white text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <p className="text-gray-600 mb-6">
          Hear from our successful startups and their experiences with our support.
        </p>
      </div>
    </section>
  );
}

function SuccessStories() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-center py-8">Success Stories</h1>
      <HeroSection />
      <Section />
      <Testimonial />
    </div>
  );
}

export default SuccessStories;
