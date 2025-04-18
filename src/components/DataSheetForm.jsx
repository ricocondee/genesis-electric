import React, { useState } from "react";
import { SaveIcon } from "lucide-react";
import DataSheetStyles from "../styles/DataSheet.module.css"; // Importa el CSS Module

const DataSheetForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    color: "",
    btu: "",
    consumption: "",
    power: "",
    volts: "",
    refrigerant: "",
    height: "",
    width: "",
    length: "",
    wight: "",
    wifi: false,
    remoteControl: false,
    stock: "",
    warranty: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className={DataSheetStyles.container}>
      <div className={DataSheetStyles.formWrapper}>
        <h1 className={DataSheetStyles.title}>Ficha Técnica del Equipo</h1>
        <form onSubmit={handleSubmit}>
          {/* Información Básica */}
          <div>
            <h2 className={DataSheetStyles.sectionTitle}>Información Básica</h2>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="brand">Marca</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="model">Modelo</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
          </div>

          {/* Dimensiones y Peso */}
          <div>
            <h2 className={DataSheetStyles.sectionTitle}>Dimensiones y Peso</h2>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="height">Alto (cm)</label>
              <input
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="width">Ancho (cm)</label>
              <input
                type="text"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
          </div>

          {/* Funcionalidades */}
          <div>
            <h2 className={DataSheetStyles.sectionTitle}>Funcionalidades</h2>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="modelo">BTU</label>
              <input
                type="text"
                id="BTU"
                name="BTU"
                value={formData.BTU}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="volts">Voltaje</label>
              <input
                type="text"
                id="volts"
                name="volts"
                value={formData.volts}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="power">Potencia</label>
              <input
                type="text"
                id="power"
                name="power"
                value={formData.power}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="refrigerant">Refrigerante</label>
              <input
                type="text"
                id="refrigerant"
                name="refrigerant"
                value={formData.refrigerant}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
             <div className={DataSheetStyles.inputGroup}>
              <label htmlFor="consumption">Consumo</label>
              <input
                type="text"
                id="consumption"
                name="consumption"
                value={formData.consumption}
                onChange={handleChange}
                className={DataSheetStyles.inputField}
                required
              />
            </div>
            
            <div className={DataSheetStyles.inputGroup}>
              <label>
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                />
                Wifi
              </label>
            </div>
            <div className={DataSheetStyles.inputGroup}>
              <label>
                <input
                  type="checkbox"
                  name="remoteControl"
                  checked={formData.remoteControl}
                  onChange={handleChange}
                />
                Control Remoto
              </label>
            </div>
          </div>

          {/* Botón de Enviar */}
          <button type="submit" className={DataSheetStyles.submitButton}>
            <SaveIcon className={DataSheetStyles.icon} />
            Guardar Ficha Técnica
          </button>
        </form>
      </div>
    </div>
  );
}

export default DataSheetForm;