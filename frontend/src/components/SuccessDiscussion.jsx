const SuccessDiscussion = () => {
    const milestones = [
      {
        icon: "src/assets/images/entrepreneur.png",
        title: "Entrepreneurs Supported",
        description: "Over 500+ entrepreneurs mentored and guided.",
      },
      {
        icon: "src/assets/images/funds.png",
        title: "Funds Raised",
        description: "$2 million+ in funding secured for startups.",
      },
      {
        icon: "src/assets/images/events.png",
        title: "Events Conducted",
        description: "100+ workshops, events, and meetups.",
      },
      {
        icon: "src/assets/images/ment.png",
        title: "Mentorship",
        description: "500+ hours of training provided to startups.",
      },
    ];
  
    return (
      <div className="bg-white py-12 px-8">
        {/* Key Milestones Section */}
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center mt-6">
          {/* Placeholder */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 md:pr-8">
            <div className="w-64 h-96 bg-gray-200 flex items-center justify-center rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg">
              <img
                src="src/assets/images/hands.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
          </div>
          </div>
          {/* Milestones */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Key Milestones and <br/>Achievements of AGS and <br/>Ghana Startup Week </h2>
            <ul className="space-y-4">
              {milestones.map((milestone, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-4">
                    <img src={milestone.icon} alt="icon" className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Success Stories Section */}
        <div className="max-w-4xl mx-auto mt-40">
          <h2 className="text-2xl font-bold mb-6 text-center">Success Stories</h2>
          <div className="w-full h-full bg-gray-200 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg flex items-center justify-center relative">
            <img
              src="src/assets/images/vidpre.png"
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="src/assets/images/play.png.svg"
                alt="Play Button"
                className="w-16 h-16"
              />
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            In 2023, AGS partnered with a promising tech startup, &quot;TechGrow,&quot; focused on providing affordable digital solutions to small businesses. 
            Their collaboration empowered over 200 businesses with new tools to improve efficiency and profitability. 
            This success is a testament to the power of innovation and collaboration.
          </p>
        </div>
      </div>
    );
  };
  
  export default SuccessDiscussion;
  