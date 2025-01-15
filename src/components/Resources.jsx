function HeroSection() {
  return (
    <section className="bg-gray-800 text-white pt-32 pb-12">
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
        <p className="mt-2">Here you can find an overview of all the resources available to you.</p>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <OverviewSection />
      {/* Other sections and content */}
    </div>
  );
}

export default Resources;
