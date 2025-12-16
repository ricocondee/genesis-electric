import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import styles from '../styles/HeroSlider.module.css';
import Skeleton from './Skeleton';
import { showToast } from '../utils/toast';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/slides').then(response => {
      setSlides(response.data);
      setLoading(false);
    }).catch(error => {
      showToast('Error fetching slides', "error");
      setLoading(false);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };

  if (loading) {
      return (
        <div className={styles.sliderContainer}>
            <Skeleton width="100%" height="400px" />
        </div>
      );
  }

  if (slides.length === 0) return null;

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {slides.map(slide => (
          <div
            key={slide._id}
            className={styles.slide}
            onClick={() => {
              if (!isDragging && slide.cta && slide.cta.link) {
                navigate(slide.cta.link);
              }
            }}
          >
            <div className={styles.imageWrapper}>
               {/* 
                 Responsive Art Direction:
                 - Mobile: Shows mobileImageUrl (if available)
                 - Desktop: Shows imageUrl
               */}
               <picture>
                 {slide.mobileImageUrl && (
                    <source media="(max-width: 768px)" srcSet={slide.mobileImageUrl} />
                 )}
                 <img 
                   src={slide.imageUrl} 
                   alt={slide.title || "Slide"} 
                   className={styles.responsiveImage} 
                 />
               </picture>
            </div>

            {/* CTA Content */}
            {(slide.cta && slide.cta.text) && (
              <div className={styles.slideContent}>
                  <button className={styles.ctaButton}>
                    {slide.cta.text}
                  </button>
              </div>
            )}
          </div>
        ))} 
      </Slider>
    </div>
  );
};

export default HeroSlider;
