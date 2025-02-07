import HeroVision from "../components/Herovision";
import DiscussVision from "../components/Discussvision";
import ContactForm from "../components/ContactForm";
import NavbarDark from "../components/NavbarDark";

const MissionSection = () => {
  return (
    <div>
      <HeroVision />
      <DiscussVision />
      <section className="bg-yellow-100 py-10 px-5 md:px-20 flex flex-col md:flex-row items-center -gap-2">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center mt-6">
          {/* Placeholder */}
          <div className="w-96 h-96 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden ">
              <img
                src="./images/dart.jpeg"
                alt="vision"
                className="w-full h-full object-cover "
              />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Mission Statement</h2>
            <p className="text-gray-700 font-sm mt-2 mb-20">
              Our mission is to build globally competitive startups and to be a 
              dependable, financially sound, and well-managed network and mouthpiece 
              of startup businesses in Ghana.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Vision Statement</h2>
            <p className="text-gray-700 font-sm mt-2">
              To be the most influential network of startup businesses in Ghana 
              and the West African Sub-region for the protection and growth of 
              startup businesses.
            </p>
          </div>
        </div>
      </section>
      <NavbarDark />
      <ContactForm />
    </div>
  );
};

export default MissionSection;