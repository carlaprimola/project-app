import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/tasks" element={<h1>Tasks page</h1>} />
        <Route path="/tasks/:id" element={<h1>Update Task</h1>} />
        <Route path="/verify" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;