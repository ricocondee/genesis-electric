import VOIDSVG from "../assets/void.svg";
import styles from "../styles/Void.module.css";

const Void = () => {
  return (
    <div className={styles.container}>
      <h2>No se encontraron productos</h2>
      <img src={VOIDSVG} />
    </div>
  );
};

export default Void;
