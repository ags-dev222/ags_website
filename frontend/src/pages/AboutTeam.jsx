import PropTypes from "prop-types";
import { FaLinkedin } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[50vh] w-full"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Meet Our Team
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed">
            The dedicated professionals driving Ghana's startup ecosystem forward
          </p>
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            Dedicated to Supporting Ghana's Startup Ecosystem
          </h2>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our experienced team of professionals works tirelessly to empower entrepreneurs, foster innovation, and build sustainable connections within Ghana's growing startup community.
          </p>
        </div>
      </div>
    </section>
  );
};

// Executive & Board Members Data with Professional Images
const executives = [
  {
    name: "Mr. Solomon Adjei",
    position: "President",
    company: "Association of Ghana Startups",
    linkedin: "https://www.linkedin.com/in/solomon-adjei",
    image: "./images/solomon.jpg",
  },
  {
    name: "Akosua Mensah",
    position: "Vice President",
    company: "Co-founder at InnovateTech",
    linkedin: "https://www.linkedin.com/in/akosua-mensah",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Kwame Osei",
    position: "Head of Innovation",
    company: "CTO at TechGhana",
    linkedin: "https://www.linkedin.com/in/kwame-osei",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ama Frimpong",
    position: "Marketing Director",
    company: "Brand Strategist at CreativeGH",
    linkedin: "https://www.linkedin.com/in/ama-frimpong",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Kofi Asante",
    position: "Chief Strategist",
    company: "Strategy Lead at GrowthHub",
    linkedin: "https://www.linkedin.com/in/kofi-asante",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Abena Gyasi",
    position: "Operations Manager",
    company: "Operations Lead at ScaleUp",
    linkedin: "https://www.linkedin.com/in/abena-gyasi",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
];

const boardMembers = [
  {
    name: "Nana Akufo-Addo Jr.",
    position: "Board Chairman",
    company: "Former CEO at PanAfrican Ventures",
    linkedin: "https://www.linkedin.com/in/nana-akufo-addo",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Efua Darko",
    position: "Board Member",
    company: "Managing Partner at AfricaVenture Capital",
    linkedin: "https://www.linkedin.com/in/efua-darko",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Yaw Boateng",
    position: "Board Member",
    company: "Serial Entrepreneur & Angel Investor",
    linkedin: "https://www.linkedin.com/in/yaw-boateng",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Adwoa Safo",
    position: "Board Member",
    company: "Former CFO at GhanaTech Holdings",
    linkedin: "https://www.linkedin.com/in/adwoa-safo",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Kwadwo Nkrumah",
    position: "Board Member",
    company: "Innovation Consultant & Tech Advisor",
    linkedin: "https://www.linkedin.com/in/kwadwo-nkrumah",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Adjoa Baah",
    position: "Board Member",
    company: "Director at West Africa Impact Fund",
    linkedin: "https://www.linkedin.com/in/adjoa-baah",
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Fiifi Pratt",
    position: "Board Member",
    company: "Founder at Innovation Lab Africa",
    linkedin: "https://www.linkedin.com/in/fiifi-pratt",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Araba Sey",
    position: "Board Member",
    company: "Senior Partner at Growth Capital Partners",
    linkedin: "https://www.linkedin.com/in/araba-sey",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Kweku Gyasi",
    position: "Board Member",
    company: "Product Strategy Lead at Global Tech",
    linkedin: "https://www.linkedin.com/in/kweku-gyasi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
];

// Executive Section Component
const ExecutiveSection = ({ title, members }) => {
  return (
    <div className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((member, index) => (
            <div key={index} className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-200">
              {/* Professional Image */}
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
                {member.image ? (
                  <>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 text-gray-500">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-600">{member.name.charAt(0)}</span>
                      </div>
                      <p className="text-xs">Photo Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Member Information */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{member.name}</h3>
                  <p className="text-sm font-medium text-green-600 mb-1">{member.position}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{member.company}</p>
                </div>

                {/* LinkedIn Connection */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Connect</span>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                    <FaLinkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
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
      <Navbar theme="light" />
      <div className="pt-20">
        <BlogSection />
        <HeroSection />
        <ExecutiveBoard />
        <ContactForm />
      </div>
    </>
  );
}

export default AboutTeam;
