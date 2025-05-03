import { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import styles from "../styles/ProductForm.module.css";
import PropTypes from "prop-types";

const ProductForm = ({ formData, setFormData, onNext, onClose }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (formData.image && typeof formData.image !== "string") {
      setImagePreview(URL.createObjectURL(formData.image));
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h1 className={styles.title}>Product Details</h1>
        <form onSubmit={handleNext}>
          <div>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Image</label>
            <div>
              {imagePreview && <img src={imagePreview} alt="Preview" className={styles.imagePreview} />}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadButton}
              >
                <Upload size={20} style={{ marginRight: 8 }} />
                Upload Image
              </button>
            </div>
          </div>

          <div>
            <label className={styles.label}>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.inputField}
              required
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.inputField}
              rows={4}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Siguiente
          </button>
        </form>
      </div>
    </div>
  );
};
ProductForm.propTypes = {
  formData: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductForm;
