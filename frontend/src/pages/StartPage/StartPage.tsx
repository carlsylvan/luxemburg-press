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
    <img width="400" src="DP2M0234.jpg" alt=""></img>

    <img width="400" src="DP2M0096.jpg" alt=""></img>
    <img width="400" src="DP2M0091.jpg" alt=""></img>

    <img width="400" src="DP2M0137.jpg" alt=""></img>
    <img width="400" src="DP2M0236.jpg" alt=""></img>

    <img width="400" src="DP2M0246.jpg" alt=""></img>
    <img width="400" src="500chf.jpg" alt=""></img>

    <img width="400" src="10-11.jpg" alt=""></img>
    <img width="400" src="Hektar.jpg" alt=""></img>

    <img width="400" src="Scan_20220917 (2).jpg" alt=""></img>
    <img width="400" src="Prospector.jpg" alt=""></img>

    <img width="400" src="february11.jpg" alt=""></img>
    <img width="400" src="Inwestor.jpg" alt=""></img>

    <img width="400" src="1.jpg" alt=""></img>
    <img width="400" src="february14.jpg" alt=""></img>

    <img width="400" src="Scan_20220917 (5).jpg" alt=""></img>
    <img width="400" src="Full front.jpg" alt=""></img>

    <img width="400" src="february16.jpg" alt=""></img>
    <img width="400" src="Scan_20220917 (6).jpg" alt=""></img>

    <img width="400" src="Inwestor2.jpg" alt=""></img>
    <img width="400" src="18-19.jpg" alt=""></img>

    <img width="400" src="500chf2.jpg" alt=""></img>
    <img width="400" src="february22.jpg" alt=""></img>

    <img width="400" src="Prospector2.jpg" alt=""></img>
    <img width="400" src="Hektar2.jpg" alt=""></img>

    <img width="400" src="Scan_20220917 (4).jpg" alt=""></img>
    </div>
  )
}

export default StartPage
