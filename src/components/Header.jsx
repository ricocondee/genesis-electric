import HeaderStyles from '../styles/Header.module.css'
import Button from './Button'
import Logo from '../assets/logo.png'
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
                <li><a href="#about">Nosotros</a></li>
                <li><a href="#services">Servicios</a></li>
                <li><a href="https://drive.google.com/file/d/1fahl7SJylkjwbkBqKnk_mKN5T22cVq3a/view?usp=sharing" target='blank'>Productos</a></li>
                <li><Button text='Contacto' url='#contact'/></li>
            </ul>
        </nav>
        
    </header>
  )
}

export default Header