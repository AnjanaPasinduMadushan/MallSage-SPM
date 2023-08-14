import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Authentication/signup';
import SignIn from './pages/Authentication/signin';
import Home from './pages/home/home';
import { AdminHome } from './pages/home/admin-home';
import WithHeader from './components/Headers/withHeader';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWithHeader />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/adminhome" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  )
}

const HomeWithHeader = WithHeader(Home);

export default App
