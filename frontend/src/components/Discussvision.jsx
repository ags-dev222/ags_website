const Discussvision = () => {
 

    return (
      <div className="bg-white py-8 sm:py-12 mb-6 px-4 sm:px-8">
        {/* Key Milestones Section */}
        <div className="py-6 sm:py-10 px-4 sm:px-5 md:px-20 flex flex-col md:flex-row items-center gap-4 sm:gap-8">
          {/* Placeholder */}
          <div className="w-full md:w-1/2 flex justify-center mt-4 sm:mt-8 md:mt-0 md:pr-8">
            <div className="w-full max-w-[20rem] sm:max-w-[24rem] mt-4 sm:mt-8 mb-4 sm:mb-8 aspect-square bg-gray-200 flex items-center rounded-lg">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src="./images/whatwedo.jpeg"
                alt="whatwedo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>
          {/* Milestones */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mt-4 font-bold mb-4 sm:mb-6">WHAT WE ARE AND WHAT<br className="hidden sm:block"/> WE DO </h2>
            <p className="mb-3 text-xs sm:text-sm lg:text-base">
            The Association of Ghana Startups, known mostly as AGS, is the premium association and mouthpiece of startup entrepreneurs in Ghana, with a mission to build globally competitive startups, increasing their chances of survival and enhancing their growth while reducing rate of collapsing, via engaging seasoned entrepreneurs for knowledge sharing, government, regulators, financial services providers, and advisory services providers, among others to create the necessary environment for startup businesses to take off and to scale up to become global brands.
          </p>
          <p className="mb-3 mt-3 text-xs sm:text-sm lg:text-base">
            Our key objective is to create a common platform for startup entrepreneurs and MSME businesses to interact and share ideas, challenges and solutions, and to set up a pool of business support service providers to readily assist startup businesses in Ghana. We work in partnership with several institutions to offer tailor-made support services for Startups across the country
          </p>
          </div>
        
  
          
        </div>
      </div>
    );
  };
  
  export default Discussvision;
  