import Header from "../Header/Header";
import ListProduct from "../ListProduct/ListProduct";
import "./AllLayout.css";
import Headerbar from "../Headerbar/Headerbar";
import Foodter from "../Foodter/Foodter";
function AllLayout() {
  return (
    <div className="container">
      <Header />
      <Headerbar />
      <ListProduct />
      <footer className="ud-footerr">
        <Foodter />
      </footer>
    </div>
  );
}

export default AllLayout;
