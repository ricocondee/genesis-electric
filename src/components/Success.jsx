import { TbCircleDashedCheck } from 'react-icons/tb'
import SuccessStyles from '../styles/Success.module.css'

const Success = () => {
  return (
    <div className={SuccessStyles.container}>
        <TbCircleDashedCheck />
        <h2>¡Gracias por tu mensaje!</h2>
        <p>Nos pondremos en contacto contigo.</p>
    </div>
  )
}

export default Success