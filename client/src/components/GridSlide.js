import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Masonry from 'react-masonry-css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './GridSlide.css'; // Add your custom CSS styles here

const GridSlide = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const imageChunks = chunkArray(images, 6); // Change 4 to the number of images per slide

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageChunks.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [imageChunks.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex)
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
  
    <Slider {...settings} initialSlide={currentIndex}>
      {imageChunks.map((chunk, index) => (
        <div key={index} className="slide">
          <div className='ready-to-adopt'><main>Ready to Adopt!</main></div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {chunk.map((image, imgIndex) => (
              <div key={imgIndex} className="image-container">
                <img src={image} alt={`Image ${imgIndex}`} />
              </div>
            ))}
          </Masonry>
        </div>
      ))}
    </Slider>
  );
};

export default GridSlide;
