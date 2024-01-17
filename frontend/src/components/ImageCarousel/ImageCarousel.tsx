import { useState } from "react";
import "./imageCarousel.css";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-carousel">
      {currentIndex > 0 && (
        <button onClick={goToPrevious}>&lt;</button>
      )}
      <img 
        src={new URL(images[currentIndex], import.meta.url).href} 
        alt={`Slide ${currentIndex + 1}`} 
      />
      {currentIndex < images.length - 1 && (
        <button onClick={goToNext}>&gt;</button>
      )}
    </div>
  );
};
