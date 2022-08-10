import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const ProductDetails = () => {
  const code = useParams().code;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProduct(null);
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7acaab878mshd6bf6abad2fbf96p1d04c8jsncf03a3451e7e",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };

    fetch(
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&productcode=${code}&country=us`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        setLoading(false);
        setProduct(response.product);
      })
      .catch((err) => console.error(err));
  }, []);
  //console.log(product);
  return (
    <div className="product-details">
      {loading && (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin size="4x" />
        </div>
      )}
      {product && (
        <div className="product-details">
          <h2>{product.name}</h2>
          <h3 className="product-deatial">color : {product.color.text}</h3>
          <p className="description" style={{ width: "25%" }}>
            description : {product.articlesList[0].description}
          </p>
          <h3 className="product-deatial">
            Price : $ {product.articlesList[0].whitePrice.price}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
