import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { productService } from '../services/productService';
import Item from './Item';
import styles from '../styles/ProductCarousel.module.css';
import Skeleton from './Skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { showToast } from '../utils/toast';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    productService.getAllProducts({ limit: 8 })
      .then(response => {
        const availableProducts = response.data.filter(p => p.status !== 'agotado');
        const productsWithImages = availableProducts.map(p => {
          let imageUrls = [];
          if (p.imageUrls && p.imageUrls.length > 0) {
            imageUrls = p.imageUrls;
          } else if (p.imageUrl) {
            imageUrls = [p.imageUrl];
          }
          return {
            ...p,
            price: p.price,
            iva: p.IVA,
            image: imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/300x300',
          };
        });
        setProducts(productsWithImages);
        setLoading(false);
      })
      .catch(error => {
        showToast('Error fetching products for carousel:' + error.message, "error");
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default to 4 for desktop
    slidesToScroll: 1,
    arrows: false, // We are using custom arrows
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className={styles.container}>
      <h2>Productos Destacados</h2>
      {loading ? (
        <div className={styles.skeletonGrid}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.slide}>
              <Skeleton width="100%" height="300px" borderRadius="0.75rem" />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.sliderWrapper}>
          <Slider ref={sliderRef} {...settings}>
            {products.map(product => (
              <div key={product._id} className={styles.slide}>
                <Item
                  urlID={product._id}
                  name={product.name}
                  image={product.image}
                  price={product.clientPrice}
                  netPrice={product.netPrice}
                  iva={product.IVA}
                  voltage={product.voltage}
                  btu={product.btu}
                  description={product.description}
                  seer={product.seer}
                  status={product.status}
                  energyType={product.energyType}
                  wifi={product.wifi}
                  stockQuantity={product.quantity}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
      <div className={`${styles.arrow} ${styles.prev}`} onClick={previous}>
        <ChevronLeft />
      </div>
      <div className={`${styles.arrow} ${styles.next}`} onClick={next}>
        <ChevronRight />
      </div>
    </div>
  );
};

export default ProductCarousel;
