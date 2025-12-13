import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/ProductD.module.css";
import Loader from "./Loader";
import { showToast } from "../utils/toast";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";
import { trackProductView } from "../services/sessionService";
import { ChevronDown } from "lucide-react";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

const specTranslations = {
  btu: "BTU",
  voltage: "Voltaje",
  color: "Color",
  seer: "SEER",
  energyType: "Eficiencia",
  refrigerant: "Refrigerante",
  system: "Sistema",
  brand: "Marca",
};

function Product() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    trackProductView(id);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        const productData = response.data.data ? response.data.data : response.data;
        setProduct(productData);
      } catch (error) {
        showToast(error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
      imageUrl: imageUrls[0],
      price: product.clientPrice,
      iva: product.IVA,
      netPrice: product.netPrice,
    };
    addItem(productToAdd);
    showToast(`${product.name} agregado al carrito!`, "success");
  };

  const handleBuyNow = () => {
    const productToAdd = {
      ...product,
      quantity,
      imageUrl: imageUrls[0],
      price: product.clientPrice,
      iva: product.IVA,
      netPrice: product.netPrice,
    };
    addItem(productToAdd);
    const token = localStorage.getItem('token');
    if (token && token !== "undefined") {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return <ProductDetailSkeleton />;

  const imageUrls =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : product.imageUrl
      ? [product.imageUrl]
      : [];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.productContainer}>
        <div className={`${styles.productImage} ${imageUrls.length === 1 ? styles.singleImage : ''}`}>
          <div className={styles.mainImageContainer}>
            <img
              src={imageUrls[selectedImage]}
              alt={`${product.name} - ${selectedImage + 1}`}
              className={styles.mainImage}
            />
          </div>
          {imageUrls.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.selectedThumbnail : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.productDetails}>
          <h2>{product.name}</h2>
          <p className={styles.brand}>Marca: {product.brand}</p>
          <p className={styles.description}>
            {product.description || "No description available."}
          </p>

          <div className={styles.specsContainer}>
            <h3
              className={styles.specsTitle}
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
            >
              Detalles técnicos
              <ChevronDown
                className={`${styles.specsToggleIcon} ${
                  isSpecsOpen ? styles.open : ""
                }`}
              />
            </h3>
            <div
              className={`${styles.specsContent} ${
                isSpecsOpen ? styles.open : ""
              }`}
            >
              <ul className={styles.specsList}>
                {product.specs &&
                  Object.entries(product.specs)
                    .filter(
                      ([key, value]) => value && value.toString().trim() !== ""
                    )
                    .map(([key, value]) => {
                      const isDropdown = typeof value === 'string' && value.includes(',');
                      if (isDropdown) {
                        const options = value.split(',').map(s => s.trim());
                        return (
                          <li className={styles.specItem} key={key}>
                            <strong className={styles.specLabel}>
                              {specTranslations[key] || key}:
                            </strong>
                            <select className={styles.specSelect}>
                              {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </li>
                        );
                      }
                      return (
                        <li className={styles.specItem} key={key}>
                          <strong className={styles.specLabel}>
                            {specTranslations[key] || key}:
                          </strong>
                          <span className={styles.specValue}>{value}</span>
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(product.clientPrice)}
            </span>
          </div>

          <div className={styles.quantitySelector}>
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
            <button className={styles.buyNowButton} onClick={handleBuyNow}>Comprar ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;