import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const CategoryPage = ({ db }) => {
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const cartCollectionRef = collection(db, "cart");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b7acaab878mshd6bf6abad2fbf96p1d04c8jsncf03a3451e7e",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };
  const url = window.location.pathname.split("/").pop();
  useEffect(() => {
    setProducts(null);
    setLoading(true);

    fetch(
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=${category}&concepts=H%26M%20MAN`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setProducts(response.results);
        //console.log(response);
      })
      .catch((err) => console.error(err));
    const getdata = async () => {
      //get Cart collection  :
      const cartData = await getDocs(cartCollectionRef);

      setCart(cartData.docs.map((item) => ({ ...item.data(), id: item.id })));
    };
    getdata();
  }, [url]);

  //cart && console.log(cart);

  const handleGoToProductDetails = (code) => {
    history.push(`/${category}/${code}`);
  };
  const handleAddCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log(product);

    if (
      cart.filter(
        (e) => e.title === product.name && e.price === product.price.value
      ).length > 0
    ) {
      let res = cart.filter(
        (e) => e.title === product.name && e.price === product.price.value
      );

      //console.log(res);

      const docRef = doc(db, "cart", res[0].id);

      updateDoc(docRef, { amount: res[0].amount + 1 }).then(() => {
        console.log("added");
      });
    } else {
      addDoc(cartCollectionRef, {
        title: product.name,
        price: product.price.value,
        img: product.images[0].url,
        amount: 1,
      }).then(() => {
        console.log("product add");
        window.location.reload();
      });
    }
  };

  return (
    <div className="category-page">
      {loading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="4x" />
        </div>
      )}
      <div className="products">
        {products &&
          products.map((product) => (
            <div
              className="product"
              onClick={() =>
                handleGoToProductDetails(product.defaultArticle.code)
              }
              key={product.defaultArticle.code}
            >
              <img
                src={product.images[0].url}
                alt={`${product.name} pic`}
                className="product-img"
                style={{ height: "250px", width: "200px" }}
              />
              <h3 className="product-title">{product.name}</h3>
              <h4 className="product-price">{product.price.formattedValue}</h4>
              <button
                onClick={(e) => handleAddCart(e, product)}
                className="add-cart"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
