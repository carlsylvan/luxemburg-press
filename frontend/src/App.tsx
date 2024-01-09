import { useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import goblinImg from './assets/Goblin.png';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductPage from './pages/ProductPage/ProductPage';

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
      <ProductsPage></ProductsPage>
      <ProductPage></ProductPage>
      <Footer></Footer>
      </>
  )
}

export default App
