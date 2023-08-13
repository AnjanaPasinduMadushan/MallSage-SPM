import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Authentication/signup';
import SignIn from './pages/Authentication/signin';
import Home from './pages/home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
