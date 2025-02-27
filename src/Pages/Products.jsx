import Items from '../containers/Items'
import ProductStyles from '../styles/Product.module.css'
import {motion} from "framer-motion";

const Products = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 2}} exit={{opacity: 0}} transition={{duration: 1.5}}>
    <div className={ProductStyles.container}>
      <h1 alt="Aires acondicionados baratos">¡Aires al mejor precio!</h1>
        <Items />
        <strong>*Todos los precios son con IVA incluido. Para aires centrales o de mayor capacidad cont&aacute;ctanos a nuestro WhatsApp o nuestro correo electr&oacute;nico</strong>
    </div>
    </motion.div>
  )
}

export default Products