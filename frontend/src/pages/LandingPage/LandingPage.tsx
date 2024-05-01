import ReactPlayer from "react-player";

export default function LandingPage() {
  return (
    <ReactPlayer
      url="https://vimeo.com/941539639"
      controls={false}
      playing={true}
      loop={true}
    />
  );
}
