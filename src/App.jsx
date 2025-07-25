import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Addblog from './pages/Addblog'
import Profile from './pages/Profile'
import BlogDetails from './pages/BlogDetails'
import Footer from './components/Footer'
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar'
import Search from './pages/Search'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/Addblog' element={<Addblog />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/:id' element={<BlogDetails />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App