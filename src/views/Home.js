import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {}, []);
  //cart && cart.map((item) => console.log(item.title));
  return (
    <div className="home">
      <img
        src="https://fashionista.com/.image/t_share/MTYwMTYxNjg4MTM2NDYwMjY1/h-m-close-down-cheap-monday.jpg"
        alt="img"
      />
      <h1>As Easy as ABC</h1>
      <button>
        <Link className="links home-link" to="/men">
          See more
        </Link>
      </button>
    </div>
  );
};

export default Home;
