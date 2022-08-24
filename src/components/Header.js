import React, {useEffect} from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from 'react-router-dom' 
import { useStateValue } from './StateProvider';
import { db, auth } from './firebase'




const Header = () => {
    const [{basket, user}, dispatch] = useStateValue();
    const handleAuthentication = () => {
        auth.signOut();
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if (auth) {
            dispatch({
              type: "SET_USER",
              user: authUser,
            });
          } else {
            dispatch({
              type: "SET_USER",
              user: null,
            });
          }
        });

      }, []);

  return (
    <div className='header'>

        <Link to="/"> 
            <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon logo" /> 
        </Link>
       <div className="header__search">
            <input type="text" className="header__searchInput" />
            <SearchIcon className="header__searchIcon" />
       </div>

       <div className="header__nav">
            <Link to={!user && "/login"}>
                <div className="header__option" onClick={handleAuthentication}>
                    <span className="header__optionLineOne">
                        {user ? <>Hello, {user.email}</> : <>Hello, Guest</>}
                    </span>
                    <span className="header__optionLineTwo">
                        {user ? "Sign Out" : "Sign In"}
                    </span>
                </div>
            </Link>

            <Link to="/orders">
                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        & Orders
                    </span>
                </div>
            </Link>

            <div className="header__option">
                <span className="header__optionLineOne">
                    Your
                </span>
                <span className="header__optionLineTwo">
                    Prime
                </span>
            </div>
            
            <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                </div>
            </Link>
       </div>

    </div>
  )
}

export default Header