import Navbar from "../components/Navbar";
import ResourcesAccordion from "../components/ResourcesAccordion";
function HeroSection() {
  return (
      <section className="bg-black text-white h-[500px] flex items-center justify-center">
      <div className="text-center">
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
      <p className="mt-4 text-gray-600">
        Access a variety of templates, guides, and contracts designed to help you navigate the startup landscape.
      </p>
      <div className="mt-8">
        <video controls className="mx-auto rounded-md w-3/4 shadow-md">
          <source src="./images/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </section>
  );
}

function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <ResourcesAccordion />
      {/* Other sections and content */}
    </div>
  );
}

export default Resources;
