import { useState, useRef } from "react";

interface CarSliderProps {
  imageUrls?: string[];
}

const CarSlider: React.FC<CarSliderProps> = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({});
  const imgRef = useRef<HTMLImageElement>(null);
  const zoom: number = 2; 
 if (!imageUrls || imageUrls.length === 0) return null;
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x > 0 && x < width && y > 0 && y < height) {
      setMagnifierStyle({
        display: "block",
        left: `${x}px`,
        top: `${y}px`,
        backgroundImage: `url(${imageUrls[currentIndex]})`,
        backgroundSize: `${width * zoom}px ${height * zoom}px`,
        backgroundPosition: `-${x * zoom - 50}px -${y * zoom - 50}px`,
      });
    } else {
      setMagnifierStyle({ display: "none" });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div className="product-slider overflow-hidden max-h-[500px]">
        <button onClick={prevSlide} className="slider-button prev">
          &lt;
        </button>
        <div className="slider-image-container">
          <div className="mx-auto">
            <div className="relative">
              <img
                ref={imgRef}
                src={imageUrls[currentIndex] || ""}
                alt="Car Image"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMagnifierStyle({ display: "none" })}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
              <div
                className="magnifier absolute rounded-full border-2 border-gray-400"
                style={magnifierStyle}
              ></div>
              <style>{`
                .magnifier {
                  width: 150px;
                  height: 150px;
                  pointer-events: none;
                  display: none;
                  transform: translate(-50%, -50%);
                  border: 1px solid #121212;
                  border-radius: 5%;
                }
              `}</style>
            </div>
          </div>
        </div>
        <button onClick={nextSlide} className="slider-button next">
          &gt;
        </button>
      </div>
      <div className="thumbnail-navigation">
        {imageUrls?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarSlider;
