import React from 'react';
import {Link} from "react-router-dom";

const TopNavigation = () => {
  const toggleTopNav = (event) => {
    event.stopPropagation();
    const navBarElement = document.getElementById('top-nav');
    navBarElement.className = navBarElement.className ? '' : 'responsive';
  };

  const collapseTopNav = () => {
    const navBarElement = document.getElementById('top-nav');
    navBarElement.className = '';
  };

  return (
    <nav id="top-nav" onClick={collapseTopNav}>
      <Link to="/library" className="always-visible nav-link">
        Library
      </Link>
      <div className="right-aligned">
        <Link to="/about" className="nav-link lang-link">About</Link>
      </div>
      <button className="icon" onClick={toggleTopNav}>
        <i className="fa fa-bars"/>
      </button>
    </nav>
  );
};

export default TopNavigation;
