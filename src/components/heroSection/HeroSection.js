import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import styles from "./heroSection.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyMedia from "../lazyMedia/LazyMedia";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("100vh");

  const items = [
    { type: "video", src: "https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022749/heroVid_xpx1hc.mp4" },
    { type: "video", src: "https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022834/miniVid_cifdqy.mp4" },
    { type: "video", src: "https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022749/heroVid_xpx1hc.mp4" },
    { type: "video", src: "https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022834/miniVid_cifdqy.mp4" },
    { type: "video", src: "https://res.cloudinary.com/dkhvdihhj/video/upload/v1739022749/heroVid_xpx1hc.mp4" },
  ];

  useEffect(() => {
    const updateHeight = () => {
      setMaxHeight(window.innerWidth < 768 ? "80vh" : "100vh");
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    beforeChange: (_, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div className={styles.carouselContainer} style={{ height: maxHeight }}>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            <LazyMedia type={item.type} src={item.src} alt={`carousel-${item.type}-${index}`} className={styles.media} />
          </div>
        ))}
      </Slider>

      {/* Navigation Thumbnails */}
      <div className={styles.navigationContainer}>
        <div className={styles.navigation}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.navItem} ${currentSlide === index ? styles.active : ""}`}
              onClick={() => sliderRef.current.slickGoTo(index)}
            >
              {item.type === "image" ? (
              <LazyMedia type="image" src={item.src} alt={`nav-thumb-${index}`} className={styles.thumbMedia} width={50} height={30} unoptimized={true} />
            ) : (
              <video src={item.src} alt={`nav-thumb-${index}`} className={styles.thumbMedia} muted playsInline />
            )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;