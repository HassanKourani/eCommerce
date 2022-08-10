import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ db }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  let result = [];

  const cartCollectionRef = collection(db, "cart");
  useEffect(() => {
    setCart(null);
    setLoading(true);
    const getdata = async () => {
      //get Cart collection  :
      const cartData = await getDocs(cartCollectionRef);

      setCart(cartData.docs.map((item) => ({ ...item.data(), id: item.id })));
    };

    getdata().then(() => {
      setLoading(false);
    });
  }, []);
  //console.log(cart);

  const process = () =>
    cart.forEach((r) => {
      const found = result.find(
        (a) => a.title === r.title && a.price === r.price && a.img === r.img
      );
      if (found) {
        //console.log(typeof found.amount, typeof r.amount);
        found.amount = Number(found.amount);
        found.amount += Number(r.amount);
      } else {
        result.push({ ...r });
      }
    });
  result = result.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });

  cart && process();

  //minus ammount

  const handleProductMinus = (e, product) => {
    // console.log(product);
    e.preventDefault();
    const docRef = doc(db, "cart", product.id);
    if (product.amount === 1) {
      deleteDoc(docRef).then(() => {
        console.log("deleted");
        window.location.reload();
      });
    } else {
      updateDoc(docRef, { amount: product.amount - 1 }).then(() => {
        console.log("updated");
        window.location.reload();
      });
    }
  };
  const handleProductPlus = (e, product) => {
    // console.log(product);
    e.preventDefault();
    const docRef = doc(db, "cart", product.id);
    updateDoc(docRef, { amount: product.amount + 1 }).then(() => {
      console.log("updated");
      window.location.reload();
    });
  };

  return (
    <div className="cart">
      {result && <h2 style={{ margin: "20px" }}>Your Cart</h2>}
      {loading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="4x" />
        </div>
      )}
      {result &&
        result.map((item) => (
          <div className="cart-products" key={item.id}>
            <img className="cart-img" src={item.img} alt={item.title} />
            <div className="cart-details">
              <h3 className="cart-title">{item.title}</h3>
              <h4 className="cart-detail">price : {item.price}</h4>
              <div className="add-amount">
                quantity:
                <button
                  className="btn minus"
                  onClick={(e) => handleProductMinus(e, item)}
                >
                  -
                </button>
                <h4 className="cart-detail cart-amount">{item.amount}</h4>
                <button
                  className="btn plus"
                  onClick={(e) => handleProductPlus(e, item)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cart;
