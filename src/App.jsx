import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Profile } from './pages/Profile'
import { SingUp } from './pages/SingUp'
import { SingIn } from './pages/SingIn'

export const App = () => {
  return (
    <BrowserRouter>
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
