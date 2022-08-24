import React, {forwardRef} from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

const CheckoutProduct = forwardRef((props, ref) => {
    const [{ basket }, dispatch] = useStateValue();
    const removeItem = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: props.id
        })
    }

  return (
    <div ref={ref} className='checkoutProduct'>
        <img className="checkoutProduct__image" src={props.image} alt="" />

        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{props.title}</p>
            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{props.price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(props.rating)
                .fill()
                .map((_, i) => (
                    <p>⭐</p>
                ))}
            </div>
            {!props.hideButton && (<button onClick={removeItem}>Remove from basket</button>)}
        </div>
       
    </div>
  )
}
)
export default CheckoutProduct
