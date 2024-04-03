import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '@/pages/home'
import Login from '@/pages/login'
import NotFound from '@/pages/common/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
