import { useState } from 'react'
import './startPage.css'
import goblinImg from '../../assets/Goblin.png';

function StartPage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Luxemburg Press</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Du har klickat {count} gånger. Testa att klicka en gång till!
        </button>
        <img id='goblin-img' src={goblinImg} ></img>
      </div>
    </>
  )
}

export default StartPage
