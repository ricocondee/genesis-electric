import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axiosInstance from '../api/axios';
import styles from '../styles/HeroSlider.module.css';
import Skeleton from './Skeleton';
import { showToast } from '../utils/toast';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/slides').then(response => {
      setSlides(response.data);
      setLoading(false);
    }).catch(error => {
      showToast('Error fetching slides:' + error.message, "error");
      // Fallback to mock data for development
      const mockSlides = [
        {
          _id: '1',
          imageUrl: 'https://via.placeholder.com/1200x400?text=Slide+1',
          title: 'Instalación Profesional de Aires Acondicionados',
          subtitle: 'Dejamos tu hogar o negocio con la temperatura perfecta.',
          cta: { text: 'Cotiza ahora', link: '/contact' },
        },
        {
          _id: '2',
          imageUrl: 'https://via.placeholder.com/1200x400?text=Slide+2',
          title: 'Mantenimiento Preventivo y Correctivo',
          subtitle: 'Asegura el buen funcionamiento y la vida útil de tus equipos.',
          cta: { text: 'Agenda tu visita', link: '/services' },
        },
        {
          _id: '3',
          imageUrl: 'https://via.placeholder.com/1200x400?text=Slide+3',
          title: 'Venta de Equipos de las Mejores Marcas',
          subtitle: 'Encuentra el aire acondicionado ideal para tus necesidades.',
          cta: { text: 'Ver productos', link: '/products' },
        },
      ];
      setSlides(mockSlides);
      setLoading(false);
    });
  }, []);

  const settings = {
    dots: slides.length > 1,
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: slides.length > 1,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className={styles.sliderContainer}>
      {loading ? (
        <Skeleton width="100%" height="400px" />
      ) : (
        <Slider {...settings}>
          {slides.map(slide => (
            <div key={slide._id} className={styles.slide}>
              <div 
                className={styles.slideBackground}
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              ></div>
              <div className={styles.slideContent}>
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                {slide.cta && (
                  <a href={slide.cta.link} className={styles.ctaButton}>
                    {slide.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HeroSlider;
