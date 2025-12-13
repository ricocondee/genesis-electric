
import styles from '../../../styles/admin/v2/ButtonGroup.module.css';

const ButtonGroup = ({ title, options, selected, setSelected }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.options}>
        {options.map(option => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${selected === option ? styles.selected : ''}`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
