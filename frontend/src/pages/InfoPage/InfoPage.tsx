import "./infoPage.css"
import instaIcon from "../../assets/icons/instagram.svg"
import euIcon from "../../assets/icons/euro-sign-solid.svg"
import { Link } from "react-router-dom"

export default function InfoPage() {


    return(<div className="info-page">

    <Link to={"/store"}>
    <img src={euIcon} alt="Euro Sign" className="social-icon" />
    </Link>

    <Link to="https://www.instagram.com/luxemburgpress/" target="_blank" rel="noopener noreferrer" className="social-link">
        <img src={instaIcon} alt="Instagram" className="social-icon" />
    </Link>

    </div>)
}