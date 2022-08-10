import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="heading">
        <Link className="title" to="/">
          H&M Stores
        </Link>
        <Link to="/cart">
          <FontAwesomeIcon
            className="carticon"
            icon={faCartArrowDown}
            size="2x"
          />
        </Link>
      </div>
      <div className="links-conatiner">
        <Link className="links" to="/men">
          <div className="link">MEN</div>
        </Link>
        <Link className="links" to="/ladies">
          <div className="link">LADIES</div>
        </Link>
        <Link className="links" to="/giftguide">
          <div className="link">GIFTGUIDE</div>
        </Link>
        <Link className="links" to="/kids">
          <div className="link">KIDS</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
