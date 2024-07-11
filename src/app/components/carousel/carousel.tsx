// Carousel.jsx
import { imageShimmerBase64 } from '../ImageShimmerSrc';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { PlayIcon } from '@heroicons/react/24/outline';
import { PauseIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Add isPaused state variable

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let interval = null;

    if (!isPaused) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000); // Change the interval duration (in milliseconds) as per your requirement
    }

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, isPaused]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={1080}
              height={720}
              alt={`Slide ${index}`}
              className="w-full flex-shrink-0 object-cover max-h-[720px]"
              placeholder={'data:image/svg+xml;base64,' + imageShimmerBase64(1080, 720)}
            />
          ))}
        </div>
      </div>
      <div className='flex justify-end space-x-1 py-2'>
        <Button
          isIconOnly
          size='sm'
          className=" text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
          onClick={prevSlide}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Button
          isIconOnly
          size='sm'
          className=" text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
          onClick={togglePause}
        >
          {isPaused ? (
            <PlayIcon></PlayIcon> // Replace with your play icon component
          ) : (
            <PauseIcon></PauseIcon> // Replace with your pause icon component
          )}
        </Button>
        <Button
          isIconOnly
          size='sm'
          className=" text-white bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
          onClick={nextSlide}
        >
          <ChevronRightIcon></ChevronRightIcon>
        </Button>

      </div>

    </div>
  );
};

export default Carousel;
