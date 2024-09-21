import { useState } from "react";
import ReactPlayer from "react-player";

const CarPromoVideo = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="mt-20  border mb-20 relative h-[300px] md:h-[450px] w-full">
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co/9v1PtRg/promovido.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
      </div>
      <div className="relative container mx-auto flex flex-col justify-center items-center h-full px-4">
        <p className="text-red-500 text-xl mb-2">Explore</p>
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
          Car <span className="text-red-600">Promo</span> Video
        </h1>

        {/* Video Button */}
        <div className="mt-4">
          <div
            className="w-40 h- sm:w-20 sm:h-20 border-2 border-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowVideo(true)}
          >
            <button className="text-black text-2xl sm:text-3xl bg-transparent border-none">
              ▶️
            </button>
          </div>
        </div>

        {/* ReactPlayer Component */}
        {showVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative">
              <ReactPlayer
                url="https://youtu.be/yh0ZGHiizSA?si=hSzQtR6lp_-_v_iD"
                playing
                controls
                width="100%"
                height="100%"
                className="rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-transparent border-none"
                onClick={() => setShowVideo(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarPromoVideo;
