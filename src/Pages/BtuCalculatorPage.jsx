
import BtuCalculator from '../components/BtuCalculator';
import styles from '../styles/BtuCalculator.module.css';
import GennyAI from '../assets/gennyAI.svg';

const BtuCalculatorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aiContainer}>
        <div className={styles.aiImage}>
          <img src={GennyAI} alt="Genny AI" />
          <div className={styles.speechBubble}>
            <p>¡Hola! Soy Genny 👋, tu asistente de climatización. Cuéntame sobre tu habitación y te diré cuántos BTU necesitas.</p>
          </div>
        </div>
        <div className={styles.calculatorContainer}>
          <BtuCalculator />
        </div>
      </div>
    </div>
  );
};

export default BtuCalculatorPage;
