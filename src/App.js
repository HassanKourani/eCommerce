import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import { db } from "./config";
import Navbar from "./views/Navbar";
import CategoryPage from "./views/CategoryPage";
import ProductDetails from "./views/ProductDetails";
import Cart from "./views/Cart";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart db={db} />
          </Route>
          <Route exact path="/:category">
            <CategoryPage db={db} />
          </Route>
          <Route exact path="/:category/:code">
            <ProductDetails db={db} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
