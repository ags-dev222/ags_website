const TopPartneringSection = () => {
    const logos = ["/logo1.png", "/logo2.png", "/logo3.png", "/logo4.png"]; // Replace with actual paths
  
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Top Partnering Companies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {logos.map((logo, index) => (
              <img key={index} src={logo} alt={`Partner ${index + 1}`} className="mx-auto max-h-16" />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TopPartneringSection;
  