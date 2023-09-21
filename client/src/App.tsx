import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProfileProduct from "./pages/ProfileProduct/ProfileProduct";
import Login from "./pages/Login/Login";
import Signin from "./pages/Signin/Signin";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Checkout from "./pages/Checkout/Checkout";
import Admin from "./pages/Admin/Admin";
import UserAdmin from "./pages/Admin/UserAdmin/UserAdmin";
import ProductAdmin from "./pages/Admin/ProductAdmin/ProductAdmin";
import LearNing from "./pages/LearNing/LearNing";
import Videos from "./pages/Videos/Videos";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import CreateVideo from "./pages/Admin/CreateVideo/CreateVideo";
import CrAuthor from "./pages/CrAuthor/CrAuthor";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile/:id" element={<ProfileProduct />} />
        <Route path="/shopping" element={<ShoppingCart />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/useradmin" element={<UserAdmin />} />
        <Route path="/productadmin" element={<ProductAdmin />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/learning" element={<LearNing />} />
        <Route path="/videos/:id" element={<Videos />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/createvd/:id" element={<CreateVideo />} />
        <Route path="/author" element={<CrAuthor />} />
      </Routes>
    </Router>
  );
}

export default App;
