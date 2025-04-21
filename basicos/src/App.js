import { Fragment, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Product from './components/Product';
import Cart from './components/Cart';

const App = () => {

  //State for product listing
  const [products, setProducts] = useState([
    { id: 1, name: 'Camisa ReactJS', price: 50 },
    { id: 2, name: 'Camisa VueJS', price: 40 },
    { id: 3, name: 'Camisa Node.JS', price: 30 },
    { id: 4, name: 'Camisa Angular', price: 20 },
  ]);

  //State for shopping cart
  const [cart, setCart] = useState([]);

  const date = new Date().getFullYear();

  return (
    <Fragment>
      <Header
        title="Tienda Virtual"
      />

      <h1>Lista de Productos</h1>
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
      <Cart
        cart={cart}
      />

      <Footer
        date={date}
      />
    </Fragment>
  );
}

export default App;
