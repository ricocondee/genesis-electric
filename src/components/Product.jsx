import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/ProductD.module.css";
import Loader from "./Loader";
import { Wifi, WifiOff, Leaf, Palette, GaugeCircle } from "lucide-react"; // Importamos íconos

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ricocondee/genesis-electric/main/src/db/products.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const cleanedData = data.map((product) => {
          const originalPrice =
            parseFloat(product.price.replace(/\./g, "")) || 0;
          const priceWithIncrements = originalPrice * 1.2 * 1.19;

          return {
            ...product,
            price: priceWithIncrements,
            relevance: parseFloat(product.relevance) || 0,
          };
        });

        const foundProduct = cleanedData.find((p) => p.publicId === id);
        if (!foundProduct) throw new Error("Producto no encontrado");

        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productDetails}>
        <h2>{product.name}</h2>
        <p className={styles.description}>
          {product.description || "No description available."}
        </p>

        <div className={styles.tags}>
          {product.specs.map((spec, index) => (
            <div key={index} className={styles.tag}>
              <span>{spec.volt}</span>
              <span>{spec.btu}</span>
            </div>
          ))}
        </div>

        {/* Especificaciones adicionales */}
        <div className={styles.features}>
          {product.color && (
            <div className={styles.feature}>
              <Palette size={18} className={styles.icon} />
              <span>
                <strong>Color:</strong> {product.color}
              </span>
            </div>
          )}

          {product.wifi !== null && (
            <div className={styles.feature}>
              {product.wifi ? (
                <Wifi size={18} className={styles.icon} />
              ) : (
                <WifiOff size={18} className={styles.icon} />
              )}
              <span>
                <strong>WiFi:</strong> {product.wifi ? "Sí" : "No"}
              </span>
            </div>
          )}

          {product.type && (
            <div className={styles.feature}>
              <Leaf size={18} className={styles.icon} />
              <span>
                <strong>Tipo:</strong> {product.type}
              </span>
            </div>
          )}

          {product.seer && (
            <div className={styles.feature}>
              <GaugeCircle size={18} className={styles.icon} />
              <span>
                <strong>SEER:</strong> {product.seer}
              </span>
            </div>
          )}
        </div>

        <p className={styles.price}>${product.price.toLocaleString()}</p>

        <div className={styles.quantitySelector}>
          <button onClick={decreaseQty}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>+</button>
        </div>

        <div className={styles.actions}>
          <button className={styles.buy}>
            <a
              href={`https://api.whatsapp.com/send?phone=573005515224&text=${encodeURIComponent(
                `Hola, estoy interesado en el producto: ${product.name}\n\n` +
                  `Especificaciones:\n` +
                  product.specs
                    .map((spec) => `• Volt: ${spec.volt}, BTU: ${spec.btu}`)
                    .join("\n") +
                  `\n\nCantidad: ${quantity}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Saber más
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
