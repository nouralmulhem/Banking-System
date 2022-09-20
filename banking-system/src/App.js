import "./App.css";
import Customers from "./components/Customers";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/transfer-history" component={Customers} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
