import { Routes, Route } from 'react-router-dom'
import Home from './core/Home'

const App = () => {

  return (
    <>
      <h1>True Being Wellness</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
