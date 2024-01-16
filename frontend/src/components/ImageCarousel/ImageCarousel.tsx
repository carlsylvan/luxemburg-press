import { useState } from "react";
import "./imageCarousel.css"

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const imagesArray = Object.values(images);

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
      {currentIndex == 0 && (
        <button onClick={goToPrevious}>Previous</button>
      )}
        <img 
        src={new URL(images[currentIndex], import.meta.url).href} 
        alt={`Slide ${currentIndex}`} 
      />
      {currentIndex < imagesArray.length && (
        <button onClick={goToNext}>Next</button>
      )}    
      </div>
  );
};
