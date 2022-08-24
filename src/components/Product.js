import React from 'react'
import './Product.css'
import {useStateValue} from './StateProvider'
import { motion } from 'framer-motion'

function Product({id, title, image, price, rating}) {
    const [{ basket }, dispatch] = useStateValue();

    // console.log("This is the basket >>> ", basket)
    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
          },
        });
      };


  return (
    <motion.div className='product' whileHover={{scale: 1.05, boxShadow: "0px 0px 8px rgb(128, 128, 128)"}}>
        <div className="product__info">
            <p>{title}</p>
            <p className='product__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
                {Array(rating)
                .fill()
                .map((_, i) => (
                    <p>⭐</p>
                ))}
            </div>
        </div>
        <img src={image} alt="" />
        <button onClick={addToBasket}>Add To Bastket</button>
    </motion.div>
  )
}

export default Product