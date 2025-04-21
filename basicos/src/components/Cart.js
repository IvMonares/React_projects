import React from 'react';
import './Cart.css'
import Product from './Product'

const Cart = ({ cart }) => (
    <div className='cart'>
        <h2>Tu carrito de compras</h2>
        {cart.length === 0
            ? <p>No tienes productos en tu carrito</p>
            : cart.map(product => (
                <Product
                    key={product.id}
                    product={product}
                />
            ))}
    </div>
)

export default Cart;