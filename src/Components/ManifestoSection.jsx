import React from "react";

const ManifestoSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Manifesto</h2>
          <p className="text-gray-600">
            Discover our vision for innovation, growth, and a dynamic startup ecosystem.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Mission" content="Our goal is to empower startups with resources and connections." />
          <Card title="Vision" content="Building an ecosystem that fosters innovation and collaboration." />
          <Card title="Values" content="Integrity, innovation, and inclusion drive everything we do." />
          <Card title="Impact" content="Over 1000 startups have benefited from our programs." />
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, content }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default ManifestoSection;
