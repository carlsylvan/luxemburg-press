import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import goblinImg from './assets/Goblin.png';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <h1>Luxemburg Press</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Du har klickat {count} gånger. Testa att klicka en gång till!
        </button>
        <img id='goblin-img' src={goblinImg} ></img>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
