import React from 'react';

const Product = ({ product, cart, setCart }) => {

    const { id, name, price } = product;

    const selectProduct = id => {
        console.log(product);
        setCart([...cart, product]);
    }

    return (
        <div id={id}>
            <h3>{name}</h3>
            <p>{price}</p>
            <button
                type="button"
                onClick={() => selectProduct(id)}
            >Comprar</button>
        </div>
    )
};

export default Product;