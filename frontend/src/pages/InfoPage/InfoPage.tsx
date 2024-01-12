import "./infoPage.css"
import instaIcon from "../../assets/icons/instagram.svg"
import euIcon from "../../assets/icons/euro-sign-solid.svg"

export default function InfoPage() {


    return(<div className="page">

        <img src={euIcon} height="100px" ></img>

        <a href="https://www.instagram.com/luxemburgpress/" target="_blank" rel="noopener noreferrer">
        <img width="100px" src={instaIcon} />
        </a>
    </div>)
}