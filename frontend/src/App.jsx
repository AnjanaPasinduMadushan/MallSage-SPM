import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Authentication/signup";
import SignIn from "./pages/Authentication/signin";
import Home from "./pages/home/home";
import { AdminHome } from "./pages/home/admin-home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  //Use Selector to getv logged role
  const isLoggedrole = useSelector((state) => state.auth.User.role);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedrole === "admin" && (
          <Route path="/adminhome" element={<AdminHome />} />
        )}
        <Route path="/adminhome" element={<AdminHome />} />
        {isLoggedrole === "customer" && <Route path="/" element={<Home />} />}
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route path="*" element={<h1><center>Page Not Found</center></h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
