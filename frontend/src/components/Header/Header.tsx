import "./header.css"
import cartIcon from '../../assets/cart-shopping-solid.svg'
import storeIcon from '../../assets/store-solid.svg'
import infoIcon from '../../assets/circle-info-solid.svg'
import { Link } from "react-router-dom"

export default function Header() {

    return(<div className="header">
                <div className="nav">

              <Link style={{ textDecoration: 'none' }} to="/">
              <h1>LUXEMBURG PRESS</h1>
              </Link>
              
        <ul className="nav-list">

        <Link style={{ textDecoration: 'none' }} to="/info">
            <li className="nav-list-item">
                Info
                <img src={infoIcon}></img>
            </li>
        </Link>

        <Link style={{ textDecoration: 'none' }} to="/store">
            <li className="nav-list-item">
                Köp
                <img src={storeIcon}></img>
            </li>
        </Link>

        {/* <Link style={{ textDecoration: 'none' }} to="/cart"> */}
            <li className="nav-list-item">
                Korg
                <img src={cartIcon}></img>
            </li>
        {/* </Link> */}
        </ul>
        </div>
    </div>)
}