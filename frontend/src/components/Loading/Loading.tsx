import "./loading.css";
import euIcon from "../../assets/icons/euro-sign-solid.svg";

export default function Loading() {
  return (
    <div className="euro-loading-icon-wrapper">
      <img src={euIcon} alt="Euro Sign" className="euro-loading-icon" />
    </div>
  );
}
