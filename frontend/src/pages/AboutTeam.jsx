import PropTypes from "prop-types";
import { FaLinkedin } from "react-icons/fa";
import NavbarDark from "../components/NavbarDark";
import ContactForm from "../components/ContactForm";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-140 w-full grayscale"
      style={{
        backgroundImage: "url('./images/vision.jpeg')", // Replace with actual image URL
      }}
    >
    </div>
  );
};

const BlogSection = () => {
  return (
    <section className="bg-white py-10 mt-12">
      <div className="max-w-5xl mx-auto bg-white">
        {/* Header Section */}
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            We&apos;ve got an entire team dedicated to supporting startups, mentors, and investors.
          </h1>
        </div>
        <p className="mb-3 font-sm mt-3 text-center">
          Explore the remarkable journey of AGS and Ghana Startup Week. Discover how we have empowered
          entrepreneurs, fostered innovation, and transformed the startup ecosystem in Ghana.
        </p>
      </div>
    </section>
  );
};

// Executive & Board Members Data
const executives = [
  {
    name: "Mr. Solomon Adjei",
    position: "President",
    company: "Association of Ghana Startups",
    linkedin: "https://www.linkedin.com/in/solomon-adjei",
    image: "./images/solomon.jpg",
  },
  {
    name: "Jane Doe",
    position: "Vice President",
    company: "CEO at StartupX",
    linkedin: "https://www.linkedin.com/in/jane-doe",
    image: "./images/lady.png",
  },
  {
    name: "Michael Johnson",
    position: "Head of Innovation",
    company: "Lead Engineer at TechWorld",
    linkedin: "https://www.linkedin.com/in/michael-johnson",
    image: "./images/michael.jpg",
  },
  {
    name: "Sarah Williams",
    position: "Marketing Director",
    company: "CMO at CreativeHub",
    linkedin: "https://www.linkedin.com/in/sarah-williams",
    image: "./images/sarah.jpg",
  },
  {
    name: "David Brown",
    position: "Chief Strategist",
    company: "Strategy Lead at GrowthWorks",
    linkedin: "https://www.linkedin.com/in/david-brown",
    image: "./images/david.jpg",
  },
  {
    name: "Emily Carter",
    position: "Operations Manager",
    company: "Operations Lead at AgileWorks",
    linkedin: "https://www.linkedin.com/in/emily-carter",
    image: "/images/emily.jpg",
  },
];

const boardMembers = [
  {
    name: "John Smith",
    position: "Board Member",
    company: "Former CTO at TechCorp",
    linkedin: "https://www.linkedin.com/in/john-smith",
    image: "/images/john.jpg",
  },
  {
    name: "Alice Johnson",
    position: "Board Member",
    company: "Investor at VentureGrow",
    linkedin: "https://www.linkedin.com/in/alice-johnson",
    image: "/images/alice.jpg",
  },
  {
    name: "Robert King",
    position: "Board Member",
    company: "Entrepreneur at StartFlow",
    linkedin: "https://www.linkedin.com/in/robert-king",
    image: "/images/robert.jpg",
  },
  {
    name: "Jessica Lee",
    position: "Board Member",
    company: "CFO at FinanceVision",
    linkedin: "https://www.linkedin.com/in/jessica-lee",
    image: "/images/jessica.jpg",
  },
  {
    name: "Daniel White",
    position: "Board Member",
    company: "Tech Consultant at InnovateAI",
    linkedin: "https://www.linkedin.com/in/daniel-white",
    image: "/images/daniel.jpg",
  },
  {
    name: "Sophia Green",
    position: "Board Member",
    company: "HR Director at TalentBridge",
    linkedin: "https://www.linkedin.com/in/sophia-green",
    image: "/images/sophia.jpg",
  },
  {
    name: "Ethan Scott",
    position: "Board Member",
    company: "Founder at Visionary Labs",
    linkedin: "https://www.linkedin.com/in/ethan-scott",
    image: "/images/ethan.jpg",
  },
  {
    name: "Olivia Adams",
    position: "Board Member",
    company: "Investor at CapitalWealth",
    linkedin: "https://www.linkedin.com/in/olivia-adams",
    image: "/images/olivia.jpg",
  },
  {
    name: "William Taylor",
    position: "Board Member",
    company: "Product Manager at NexGen",
    linkedin: "https://www.linkedin.com/in/william-taylor",
    image: "/images/william.jpg",
  },
];

// Executive Section Component
const ExecutiveSection = ({ title, members }) => {
  return (
    <div className="py-10 mx-16">
      <h2 className="text-3xl font-bold ml-5 text-gray-800 mt-6 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {members.map((member, index) => (
          <div key={index} className="p-3 rounded-lg text-left bg-gray-100 shadow-lg">
            {/* Placeholder or Custom Image */}
            <div className="w-64 h-56 rounded-md mb-4 overflow-hidden bg-gray-300">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Name & LinkedIn Icon */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
                <p className="text-sm text-gray-600">{member.company}</p>
              </div>

              {/* LinkedIn Icon */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ **Prop Validation**
ExecutiveSection.propTypes = {
  title: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};

// Executive Board Component
const ExecutiveBoard = () => {
  return (
    <div>
      <ExecutiveSection title="Our Executive" members={executives} />
      <ExecutiveSection title="Our Board of Directors" members={boardMembers} />
    </div>
  );
};

// Main AboutTeam Component
function AboutTeam() {
  return (
    <>
      <NavbarDark />
      <BlogSection />
      <HeroSection />
      <ExecutiveBoard />
      <ContactForm />
    </>
  );
}

export default AboutTeam;
