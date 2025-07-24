import React from 'react';
import Slider from 'react-slick';  // Assuming 'react-slick' is installed
import styles from './videoCarousel.module.css';
import LazyMedia from '../lazyMedia/LazyMedia';

const VideoCarousel = () => {
  const settings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4, // Show 4 videos per slide
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 videos on medium screens
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 videos on small screens
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 video on very small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const videos = [
    { src: 'https://res.cloudinary.com/dkhvdihhj/video/upload/v1739023076/crossroad_jqszgd.mp4', title: 'Video 1' },
    { src: 'https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022957/watchLast_rd2hpb.mp4', title: 'Video 4' },
    { src: 'https://res.cloudinary.com/dkhvdihhj/video/upload/v1739023076/crossroad_jqszgd.mp4', title: 'Video 1' }
  ];

  return (
    <div className={styles['carousel-container']}>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className={styles['video-wrapper']}>
            <video src={video.src} alt={video.title} className={styles['carousel-video']} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;