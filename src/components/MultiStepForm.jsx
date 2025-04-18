import { useState } from "react";
import ProductForm from "./ProductForm";
import DataSheetForm from "./DataSheetForm";
import styles from "../styles/MultiStepForm.module.css";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({});
  const [dataSheetData, setDataSheetData] = useState({});

  // Paso 1: Guardar datos del producto y avanzar al siguiente formulario
  const handleProductSubmit = (data) => {
    setProductData(data);
    setStep(2);
  };

  // Paso 2: Guardar datos de la ficha técnica y enviar todo
  const handleDataSheetSubmit = (data) => {
    setDataSheetData(data);

    // Simulación de envío (puedes reemplazar con una API real)
    console.log("✅ Enviando formulario de producto:", productData);
    console.log("✅ Enviando ficha técnica:", data);

    alert("Formularios enviados con éxito 🚀");
  };

  return (
    <div className={styles.container}>
      {step === 1 ? (
        <ProductForm onSubmit={handleProductSubmit} />
      ) : (
        <DataSheetForm onSubmit={handleDataSheetSubmit} onBack={() => setStep(1)} />
      )}
    </div>
  );
};

export default MultiStepForm;
