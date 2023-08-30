import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Authentication/signup';
import SignIn from './pages/Authentication/signin';
import Home from './pages/home/home';
import { AdminHome } from './pages/home/admin-home';
import { useSelector } from 'react-redux';

function App() {

  const isLogged = useSelector((state) => state.isLogged);
  console.log(isLogged);

  return (
    <BrowserRouter>
      <Routes>
        {/* {isLogged && <Route path="/adminhome" element={<AdminHome />} />} */}
        <Route path="/adminhome" element={<AdminHome />} />
        {/* {isLogged && <Route path="/" element={<Home />} />} */}
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route path="*" element={<h1><center>Page Not Found</center></h1>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
