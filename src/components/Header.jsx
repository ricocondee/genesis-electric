import HeaderStyles from '../styles/Header.module.css'
import Logo from '../assets/GE_SVG_COLOR.svg'
import { TbMenu2 } from 'react-icons/tb'

const Header = () => {
  return (
    <header className={HeaderStyles.container}>
      <div className={HeaderStyles.logo__container}>
        <a href="/"><img src={Logo} alt="Logo de G&eacute;nesis Electric"/></a>
      </div>
      <input type="checkbox" name="menu" id="menu" />
        <label className={HeaderStyles.menu} htmlFor="menu"><TbMenu2 /></label>
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/#about">Nosotros</a></li>
                <li><a href="/#services">Servicios</a></li>
                <li><a href="/products">Productos</a></li>
                <li><a href="/#contact">Contacto</a></li>
            </ul>
        </nav>
        
    </header>
  )
}

export default Header
