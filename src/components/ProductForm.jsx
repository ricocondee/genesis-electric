import { useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import styles from "../styles/ProductForm.module.css";
import PropTypes from "prop-types";

const ProductForm = ({ onSave, product, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    providersPrice: 0,
    profitPercentage: 0,
    quantity: 0,
    estado: "publicado",
    discount: 0,
    category: "",
    specs: {},
  });
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        specs: product.specs || {},
      });
      setImagePreview(product.imageUrl);
    } else {
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        providersPrice: 0,
        profitPercentage: 0,
        quantity: 0,
        estado: "publicado",
        discount: 0,
        category: "",
        specs: {},
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (oldKey, newKey, value) => {
    const newSpecs = { ...formData.specs };
    if (oldKey !== newKey) {
      delete newSpecs[oldKey];
    }
    newSpecs[newKey] = value;
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  const addSpec = () => {
    const newSpecs = { ...formData.specs };
    const newKey = `spec${Object.keys(newSpecs).length + 1}`;
    newSpecs[newKey] = "";
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  const removeSpec = (key) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={24} />
        </button>
        <h1 className={styles.title}>
          {product ? "Editar Producto" : "Agregar Producto"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Imagen</label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
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
                Subir Imagen
              </button>
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Precio del proveedor</label>
              <input
                type="number"
                name="providersPrice"
                value={formData.providersPrice}
                onChange={handleChange}
                className={styles.inputField}
                required
                step="0.01"
                min="0"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Porcentage de ganancia (%)</label>
              <input
                type="number"
                name="profitPercentage"
                value={formData.profitPercentage}
                onChange={handleChange}
                className={styles.inputField}
                required
                step="0.01"
                min="0"
              />
            </div>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.inputField}
                rows={4}
                required
              />
            </div>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Especificaciones</label>
              {Object.entries(formData.specs).map(([key, value]) => (
                <div key={key} className={styles.specRow}>
                  <input
                    type="text"
                    placeholder="Nombre de la especificación"
                    value={key}
                    onChange={(e) =>
                      handleSpecChange(key, e.target.value, value)
                    }
                    className={styles.inputField}
                  />
                  <input
                    type="text"
                    placeholder="Valor de la especificación"
                    value={value}
                    onChange={(e) => handleSpecChange(key, key, e.target.value)}
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(key)}
                    className={styles.removeButton}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpec}
                className={styles.addButton}
              >
                Agregar Especificación
              </button>
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={styles.inputField}
                required
                min="0"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Descuento (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className={styles.inputField}
                min="0"
                max="100"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={styles.inputField}
              >
                <option value="publicado">Publicado</option>
                <option value="no-publicado">No Publicado</option>
                <option value="borrador">Borrador</option>
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Categoría</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ProductForm;