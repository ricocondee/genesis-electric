import Header_styles from '../styles/Header.module.css'
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
        <nav>
            <img src={Logo} alt="Logo de Génesis Electric" />
            <ul>
                <li><a href="">Inicio</a></li>
                <li><a href="">Nosotros</a></li>
                <li><a href="">Servicios</a></li>
                <li><a href="">Productos</a></li>
                <li><a href="" className={Header_styles.button}>Contacto</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header