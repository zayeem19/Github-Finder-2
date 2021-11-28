import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar(props) {
  return (
    <nav className="navbar bg-dark text-light p-3">
      <h4>
        <i className={props.icon} /> {props.title}
      </h4>
      <ul className="list-unstyled d-flex align-items-baseline">
        <li>
          <Link to="/" className="text-light text-decoration-none mx-2">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-light text-decoration-none">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
