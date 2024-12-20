import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <form className="form-inline">
          <Link className="btn btn-outline-dark me-2" to="/admin">
            Admin
          </Link>
          <Link className="btn btn-outline-dark" to="/candidate">
            Candidate
          </Link>
        </form>
      </nav>
    </div>
  );
};

export default Navbar;
