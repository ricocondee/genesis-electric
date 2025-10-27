import styles from '../styles/ClientCarousel.module.css';
import client1 from '../assets/client1.png';
import client2 from '../assets/client2.png';
import client3 from '../assets/client3.png';
import client4 from '../assets/client4.png';
import client5 from '../assets/client5.png';
import client6 from '../assets/client6.png'; // import new logo

const logos = [
  { src: client1, alt: 'Corte Aceros' },
  { src: client2, alt: 'Distribuidora de rodamientos' },
  { src: client3, alt: 'Horming Ingenieria' },
  { src: client4, alt: 'Project Adamo' },
  { src: client5, alt: 'Fundación Grupo de Estudio' },
  { src: client6, alt: 'MIC Gestion Inmobiliaria' }, // add new logo
];

const ClientCarousel = () => {
  const duplicatedLogos = [...logos, ...logos]; // Duplicate for seamless loop

  return (
    <div className={styles.carouselContainer}>
      <h3>Ellos conf&iacute;an en nosotros</h3>
      <div className={styles.logos}>
        <div className={styles.logosSlide}>
          {duplicatedLogos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className={styles.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientCarousel;