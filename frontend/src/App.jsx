import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Authentication/signup";
import SignIn from "./pages/Authentication/signin";
import Home from "./pages/home/home";
import "../src/CSS/App.css";
import { AdminHome } from "./pages/home/admin-home";
import AddRestLocations from "./pages/Administration/addRestLocations";
import { useSelector } from "react-redux";
import ShowRestLocations from "./pages/Administration/showRestLocations";
import ViewLocation from "./pages/Administration/viewLocation";
import ViewRestLocation from "./pages/Rest-Customers/viewRestLocation";
import ViewRestLocations from "./pages/Rest-Customers/viewRestLocations";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminHeader from "./components/Headers/adminHeader";
import Header from "./components/Headers/header";
import AddEmployee from "./pages/Employees/AddEmployee";
import AddShop from "./pages/Employees/AddShop";
import { ShopHome } from "./pages/Shop/ShopHome";
import AddLuggage from "./pages/Luggage/AddLuggage";
import ViewLuggage from "./pages/Luggage/ViewLuggage";
import AddBaggageEmployee from "./pages/Employees/AddBaggageEmployee";
import BaggageEmployeeHome from "./pages/home/baggage-employee-home";
import MiniDrawer from "./components/ShopDrawer/shopDrawer";
import VerifyToken from "./pages/Shop/VerifyToken";
import ShopLuggageHistory from "./pages/Shop/ShopLuggageHistory";
import ForgotLuggages from "./pages/Luggage/ForgotLuggages";
import RestingLocationsPage from "./pages/Administration/Reports/restingLocationsPage";

function App() {
  //Use Selector to getv logged role
  const isLoggedrole = useSelector((state) => state.auth.User.role);
  const backgroundColor = "#80c3ff";
  return (
    <BrowserRouter>
      {isLoggedrole === "admin" && <AdminHeader />}
      {isLoggedrole === "customer" && <Header />}
      {isLoggedrole === "shop" && <MiniDrawer />}
      {isLoggedrole !== "customer" &&
        isLoggedrole !== "admin" &&
        isLoggedrole !== "shop" && <Header />}
      <Routes>
        {isLoggedrole === "admin" && (
          <>
            <Route path="/adminhome" element={<AdminHome />} />

            <Route path="/addEmployee" element={<AddEmployee />} />
          </>
        )}

        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/viewshopluggagehistory" element={<ShopLuggageHistory />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/addShop" element={<AddShop />} />
        <Route path="/addBaggageemployee" element={<AddBaggageEmployee />} />
        <Route path="/forgotluggages" element={<ForgotLuggages />} />
        <Route path="/shopHome" element={<ShopHome />} />
        {isLoggedrole === "customer" && <Route path="/" element={<Home />} />}
        {isLoggedrole === "shop" && (
          <>
            <Route path="/shopHome" element={<ShopHome />} />
          </>
        )}

        {isLoggedrole === "baggageemployee" && (
          <Route path="/baggageHome" element={<BaggageEmployeeHome />} />
        )}
        <Route path="/showAllLocations" element={<ShowRestLocations />} />
        <Route path="/verifyshopToken" element={<VerifyToken />} />
        <Route path="/addluggage" element={<AddLuggage />} />
        <Route path="/viewLuggage" element={<ViewLuggage />} />
        <Route path="/shopHome" element={<ShopHome />} />
        <Route
          path="/shopper/showAllLocations"
          element={<ViewRestLocations />}
        />
        <Route path="/admin/addRestLocation" element={<AddRestLocations />} />
        <Route path="/RestLocation/:id" element={<ViewLocation />} />
        <Route
          path="/Shopper/RestLocation/:id"
          element={<ViewRestLocation />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/resting-report" element={<RestingLocationsPage />} />
        {/* <Route path="*" element={<h1><center>Page Not Found</center></h1>} /> */}
      </Routes>
      {/* {isLoggedrole === "shop" && <MiniDrawer />} */}
    </BrowserRouter>
  );
}

export default App;
