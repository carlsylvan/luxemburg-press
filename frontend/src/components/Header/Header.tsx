import "./header.css";
import cartIcon from '../../assets/icons/cart-shopping-solid.svg';
import euIcon from '../../assets/icons/euro-sign-solid.svg';
import infoIcon from '../../assets/icons/circle-info-solid.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "../Cart/Cart";

export default function Header() {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <div className="header">
            <div className="nav">
                <Link style={{ textDecoration: 'none' }} to="/">
                    <h1>LUXEMBURG PRESS</h1>
                </Link>
              
                <ul className="nav-list">
                    <Link style={{ textDecoration: 'none' }} to="/info">
                        <li className="nav-list-item">
                            Info
                            <img src={infoIcon} alt="Info"></img>
                        </li>
                    </Link>

                    <Link style={{ textDecoration: 'none' }} to="/store">
                        <li className="nav-list-item">
                            Buy
                            <img src={euIcon} alt="Store"></img>
                        </li>
                    </Link>

                    <li onClick={toggleCart} className="nav-list-item">
                        Cart
                        <img src={cartIcon} alt="Cart"></img>
                    </li>
                </ul>
            </div>

            {cartOpen && <Cart></Cart>}
        </div>
    );
}
