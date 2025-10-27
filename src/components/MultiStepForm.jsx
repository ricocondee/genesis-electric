import { useState } from "react";
import ProductForm from "./ProductForm";
import DataSheetForm from "./DataSheetForm";
import axiosInstance from "../api/axios";

const MultiStepForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    code: "",
    price: "",
    description: "",
    image: null,
  });

  const [dataSheetData, setDataSheetData] = useState({
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
    weight: "",
    wifi: false,
    remoteControl: false,
    stock: "",
    warranty: "",
  });

  const handleProductNext = (data) => {
    setProductData(data);
    setStep(2);
  };

  const handleDataSheetSubmit = async (data) => {
    setDataSheetData(data);

    const fullData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        fullData.append("image", value);
      } else {
        fullData.append(key, value);
      }
    });
    Object.entries(data).forEach(([key, value]) => {
      fullData.append(key, value);
    });

    try {
      const response = await axiosInstance.post("/products", fullData);

      if (response.status === 201) {
        showToast("Producto guardado correctamente.", "success");
        onClose?.();
      } else {
        showToast("Error al guardar el producto.", "error");
      }
    } catch (error) {
      showToast("Error al enviar:" + error.message, "error");
    }
// ... (rest of the component)
  };

  return step === 1 ? (
    <ProductForm formData={productData} setFormData={setProductData} onNext={handleProductNext} onClose={onClose} />
  ) : (
    <DataSheetForm formData={dataSheetData} setFormData={setDataSheetData} onSubmit={handleDataSheetSubmit} />
  );
};

export default MultiStepForm;
