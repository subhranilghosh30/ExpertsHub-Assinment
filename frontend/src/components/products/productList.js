import React from "react";
import './productList.css';
import ProductItem from "./productItem";

const ProductList = props => {
    let contents;
    if (!props.items || props.items.length === 0) {
        contents = <p>Could not find any products. Try creating one?</p>;
    } else {
        contents = (
            <ul className="product-list">
                {props.items.map(p => (
                    <ProductItem key={p.id} name={p.title} price={p.price} />
                ))}
            </ul>
        );
    }

    return <section id="products">{contents}</section>;
};

export default ProductList;