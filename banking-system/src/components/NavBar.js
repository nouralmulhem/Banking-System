import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav">
      <div className="left">
        <ul className="ul">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/transfer-history">Transfers history</Link>
          </li>
        </ul>
      </div>

      <div className="right">
        <Link className="logo" to="/">
          <h1>TSF</h1>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
