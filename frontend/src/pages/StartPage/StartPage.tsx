// import { useState } from 'react'
import './startPage.css'
// import goblinImg from '../../assets/Goblin.png';
function StartPage() {
  // const [count, setCount] = useState(0)

  return (
    <div className='start-page'>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Du har klickat {count} gånger. Testa att klicka en gång till!
        </button>
        <img id='goblin-img' src={goblinImg} ></img>
      </div> */}

    <img width="1200" src={new URL('../../assets/images/R0020086.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/DP2M0234.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/DP2M0096.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/DP2M0091.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/DP2M0137.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/DP2M0236.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/DP2M0246.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/500chf.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/10-11.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/Hektar.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/Scan_20220917 (2).jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/Prospector.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/february11.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/Inwestor.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/1.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/february14.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/Scan_20220917 (5).jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/Full front.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/february16.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/Scan_20220917 (6).jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/Inwestor2.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/18-19.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/500chf2.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/february22.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/Prospector2.jpg', import.meta.url).href} alt=""></img>
    <img width="400" src={new URL('../../assets/images/Hektar2.jpg', import.meta.url).href} alt=""></img>

    <img width="400" src={new URL('../../assets/images/Scan_20220917 (4).jpg', import.meta.url).href} alt=""></img>
    </div>
  )
}

export default StartPage
