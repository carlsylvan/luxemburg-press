import "./header.css"
import cartIcon from '../../assets/cart-shopping-solid.svg'
import storeIcon from '../../assets/store-solid.svg'
import infoIcon from '../../assets/circle-info-solid.svg'

export default function Header() {

    return(<div className="header">
              <h1>LUXEMBURG PRESS</h1>
        <div className="nav">
        <li className="nav-list">
            <ul className="nav-list-item">
            <a href="/">
                Info
                <img src={infoIcon}></img>
            </a>
                </ul>
            <ul className="nav-list-item">
                <a href="/store">
                Köp
                <img src={storeIcon}></img>
                </a>
            </ul>
            <ul className="nav-list-item">
                Korg
                <img src={cartIcon}></img>
            </ul>
        </li>
        </div>
    </div>)
}