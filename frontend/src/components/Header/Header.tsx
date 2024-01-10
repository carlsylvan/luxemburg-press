import "./header.css"
import cartIcon from '../../assets/cart-shopping-solid.svg'
import storeIcon from '../../assets/store-solid.svg'
import infoIcon from '../../assets/circle-info-solid.svg'
import { Link } from "react-router-dom"

export default function Header() {

    return(<div className="header">
              <Link style={{ textDecoration: 'none' }} to="/">
              <h1>LUXEMBURG PRESS</h1>
              </Link>
        <div className="nav">
        <li className="nav-list">
        <Link style={{ textDecoration: 'none' }} to="/">
            <ul className="nav-list-item">
                Info
                <img src={infoIcon}></img>
                </ul>
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/store">
            <ul className="nav-list-item">
                Köp
                <img src={storeIcon}></img>
            </ul>
            </Link>
            <ul className="nav-list-item">
                Korg
                <img src={cartIcon}></img>
            </ul>
        </li>
        </div>
    </div>)
}