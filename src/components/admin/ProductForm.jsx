import { useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import styles from "../../styles/admin/ProductForm.module.css";
import PropTypes from "prop-types";
import { showToast } from '../../utils/toast';

const ProductForm = ({ onSave, product, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    imageUrl: "",
    providersPrice: 0,
    profitPercentage: 0,
    quantity: 0,
    category: "",
    status: "Borrador",
    specs: {},
  });
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

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
        category: "",
        status: "publicado",
        discount: 0,
        specs: {},
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show local preview immediately
      setIsUploadingImage(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'products'); // REPLACE WITH YOUR ACTUAL UNSIGNED UPLOAD PRESET

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        if (data.secure_url) {
          setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        } else {
          showToast('Error al subir la imagen a Cloudinary.', "error");
        }
      } catch (error) {
        showToast('Error al subir la imagen.', "error");
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploadingImage) {
      showToast('Por favor, espera a que la imagen termine de subir.', "warn");
      return;
    }
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
              <label className={styles.label}>Imagen URL</label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={styles.inputField}
              />
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
                Subir Imagen (o pegar URL)
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
              <label className={styles.label}>Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.inputField}
              >
                <option value="publicado">Publicado</option>
                <option value="borrador">Borrador</option>
                <option value="inactivo">Inactivo</option>
                <option value="agotado">Agotado</option>
              </select>
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

          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton} disabled={isUploadingImage}>
              {isUploadingImage ? 'Subiendo Imagen...' : 'Guardar'}
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
