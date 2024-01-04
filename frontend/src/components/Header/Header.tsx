import "./header.css"
import cartIcon from '../../assets/cart-shopping-solid.svg'
import storeIcon from '../../assets/store-solid.svg'
import infoIcon from '../../assets/circle-info-solid.svg'

export default function Header() {

    return(<div className="header">
        <div className="nav">
        <li className="nav-list">
            <ul className="nav-list-item">
                Info
                <img src={infoIcon}></img>
                </ul>
            <ul className="nav-list-item">
                Köp
                <img src={storeIcon}></img>
            </ul>
            <ul className="nav-list-item">
                Korg
                <img src={cartIcon}></img>
            </ul>
        </li>
        </div>
    </div>)
}