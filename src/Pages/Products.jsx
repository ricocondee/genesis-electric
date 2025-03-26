import Items from '../containers/Items'
import ProductStyles from '../styles/Product.module.css';

const Products = () => {
  return (
    <div className={ProductStyles.container}>
      <h1 alt="Aires acondicionados baratos">¡Aires al mejor precio!</h1>
        <Items />
        <strong>*Todos los precios son con IVA incluido. Para aires centrales o de mayor capacidad cont&aacute;ctanos a nuestro WhatsApp o nuestro correo electr&oacute;nico</strong>
    </div>
  )
}

export default Products