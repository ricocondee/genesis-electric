import { useState, useRef } from "react";
import { Save, Upload, X } from "lucide-react";
import styles from "../styles/ProductForm.module.css"; // Importa el CSS Module
import DataSheetForm from "./DataSheetForm";

const ProductForm = ({func}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    code: "",
    price: "",
    description: "",
  });
  const [change, setChange] = useState(false)

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (e) => {
    e.preventDefault()
    setChange(!change)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Image file:", fileInputRef.current?.files?.[0]);
  };

  return (
    <div className={styles.container}>
      {change && <DataSheetForm/>}
      <div className={styles.formWrapper}>
        <X size={24} className={styles.closeButton} onClick={func} />
        <h1 className={styles.title}>Product Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          {/* Imagen */}
          <div>
            <label htmlFor="image" className={styles.label}>
              Image
            </label>
            <div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
              <input
                type="file"
                id="image"
                name="image"
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

          {/* Categoría */}
          <div>
            <label htmlFor="category" className={styles.label}>
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          {/* Código */}
          <div>
            <label htmlFor="code" className={styles.label}>
              Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label htmlFor="price" className={styles.label}>
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.inputField}
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={styles.inputField}
              required
            />
          </div>

          {/* Botón de Enviar */}
          <a href="" className={styles.submitButton} onClick={handleClick}>Siguiente</a>
          <button type="submit" className={`${styles.submitButton} ${styles.hidden}`}>
            <Save size={20} style={{ marginRight: 8 }} />
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;