import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../img/img1.png';
import img2 from '../img/img2.png';
import img3 from '../img/img3.png';

const CarouselComponent = () => {
  return (
    <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} className="border-2 border-gray-300 rounded-md">
      <div className="p-4">
        <img src={img1} alt="Slide 1" className="w-full h-auto rounded-md" />
      </div>
      <div className="p-4">
        <img src={img2} alt="Slide 2" className="w-full h-auto rounded-md" />
      </div>
      <div className="p-4">
        <img src={img3} alt="Slide 3" className="w-full h-auto rounded-md" />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
