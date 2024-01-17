import { useState } from "react";
import "./imageCarousel.css";

interface ImageCarouselProps {
  images: { [key: string]: string };
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const imagesArray = Object.values(images);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? imagesArray.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === imagesArray.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-carousel">
      {currentIndex > 0 && (
        <button onClick={goToPrevious}>&lt;</button>
      )}
      <img 
        src={new URL(imagesArray[currentIndex], import.meta.url).href} 
        alt={`Slide ${currentIndex + 1}`} 
      />
      {currentIndex < imagesArray.length - 1 && (
        <button onClick={goToNext}>&gt;</button>
      )}
    </div>
  );
};
