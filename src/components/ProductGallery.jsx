import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductGallery({ images, name }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (images.length > 0 && loadedCount === images.length) {
      setAllLoaded(true);
      // Trigger resize to make Swiper calculate sizes correctly
      setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
    }
  }, [loadedCount, images.length]);

  if (!images.length) {
    return <p>No hay imágenes disponibles</p>;
  }

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {!allLoaded && <p style={{ textAlign: "center" }}>Cargando imágenes...</p>}

      {allLoaded && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {images.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`${name} - ${index + 1}`}
                onLoad={() => setLoadedCount((p) => p + 1)}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  objectFit: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!allLoaded &&
        images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt=""
            style={{ display: "none" }}
            onLoad={() => setLoadedCount((p) => p + 1)}
          />
        ))}
    </div>
  );
}

export default ProductGallery;