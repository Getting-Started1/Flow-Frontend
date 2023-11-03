import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation
import './NavSideBar'; // You can create a CSS file for styling

function NavSidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recommendation">Personalized Water Recommendation</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavSidebar;
