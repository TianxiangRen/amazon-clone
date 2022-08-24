import { db, updateCloudBasket } from "./firebase";
import { collection, onSnapshot, doc, getDoc} from "firebase/firestore"

export const initialState = {
  basket: [],
  user: null
};

// Selector
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":{
      if(state.user) {
        let newBasket = [...state.basket, action.item]
        updateCloudBasket(db, state.user, newBasket)
      }
      
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    }
      
      
    
    case 'EMPTY_BASKET':{
      if(state.user){
        updateCloudBasket(db, state.user, [])
      }
      
      return {
        ...state,
        basket: []
      }
    }

    case 'SET_BASKET': {
      return {
        ...state,
        basket: action.basket,
      }
    }
      

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);

      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }
      if (state.user) {
        updateCloudBasket(db, state.user, newBasket)
      }
      
      return {
        ...state,
        basket: newBasket
      }
    
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }
      
    default:
      return state;
  }
};

export default reducer;