import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Authentication/signup";
import SignIn from "./pages/Authentication/signin";
import Home from "./pages/home/home";
import { AdminHome } from "./pages/home/admin-home";
import AddRestLocations from "./pages/Administration/addRestLocations";
import { useSelector } from "react-redux";
import ShowRestLocations from "./pages/Administration/showRestLocations";
import ViewLocation from "./pages/Administration/viewLocation";
import ViewRestLocation from "./pages/Rest-Customers/ViewRestLocation";
import ViewRestLocations from "./pages/Rest-Customers/viewRestLocations";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Route path="/showAllLocations" element={<ShowRestLocations />} />
        <Route path="/shopper/showAllLocations" element={<ViewRestLocations />} />
        <Route path="/admin/addRestLocation" element={<AddRestLocations />} />
        <Route path="/RestLocation/:id" element={<ViewLocation />} />
        <Route path="/Shopper/RestLocation/:locationName" element={<ViewRestLocation />} />
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route path="*" element={<h1><center>Page Not Found</center></h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
