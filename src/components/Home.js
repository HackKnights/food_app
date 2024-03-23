import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importing a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-heading">Welcome to Our Restaurant</h1>
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/soup" className="menu-link">Soup 🍲</Link>
        </li>
        <li className="menu-item">
          <Link to="/wonton" className="menu-link">Wonton 🥟</Link>
        </li>
        <li className="menu-item">
          <Link to="/fried-rice" className="menu-link">Fried Rice 🍚</Link>
        </li>
        <li className="menu-item">
          <Link to="/orders" className="menu-link">Orders 📦</Link>
        </li>
        <li className="menu-item">
          <Link to="/about-us" className="menu-link">About us 💡</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
