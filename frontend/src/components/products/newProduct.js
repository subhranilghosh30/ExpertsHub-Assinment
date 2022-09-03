import React, { useState } from "react";

import './newProduct.css';
import Button from "../button/button";
import Input from "../input/input";

const NewProduct = props => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredPrice, setEnteredPrice] = useState('');

    const titleChangeHandler = event => {
        setEnteredTitle(event.target.value);
    };

    const priceChangeHandler = event => {
        setEnteredPrice(event.target.value);
    };

    const submitProductHandler = event => {
        event.preventDefault();
        props.onAddProduct(enteredTitle, enteredPrice);
        setEnteredPrice('');
        setEnteredTitle('');
    };

    return (
        <section id="new-product">
            <h2>Add a new Product</h2>
            <form onSubmit={submitProductHandler}>
                <Input
                    type="text"
                    label="Title"
                    id="title"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                />
                <Input
                    type="number"
                    label="Price"
                    step={0.01}
                    id="price"
                    value={enteredPrice}
                    onChange={priceChangeHandler}
                />
                <Button type="submit">ADD PRODUCT</Button>
            </form>
        </section>
    );

};

export default NewProduct;