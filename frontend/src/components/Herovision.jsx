const Herovision = () => {
    return (
        <div
            className="relative w-full h-[85vh] bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: "url('/src/assets/images/vision.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h6 className="text-4xl md:text-5xl font-bold mb-2">
                Our Mission & Vision
                </h6>
                <p className="text-lg md:text-xl">
                Let&apos;s dive into the corporate philosophies of AGS.
                </p>
            </div>
            </div>

      
    );
  };
  
  export default Herovision;
  