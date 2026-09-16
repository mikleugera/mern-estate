import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Profile } from './pages/Profile'
import { SingUp } from './pages/SingUp'
import { SingIn } from './pages/SingIn'
import { Header } from './components/Header'

export const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>  
        <Route path='/' element={<Home/>} />
        <Route path='/sing-in' element={<SingIn/>} />
        <Route path='/sing-up' element={<SingUp/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
  )
}
