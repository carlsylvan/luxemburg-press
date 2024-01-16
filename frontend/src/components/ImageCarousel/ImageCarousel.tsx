import { useState } from "react";
import "./imageCarousel.css";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 1;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 1 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-carousel">
      <button onClick={goToPrevious}>Previous</button>
      <img 
        src={new URL(images[currentIndex], import.meta.url).href} 
        alt={`Slide ${currentIndex}`} 
      />
      <button onClick={goToNext}>Next</button>
    </div>
  );
};
