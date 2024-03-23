
import React from 'react';
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Restaurant</h1>
      <ul>
        <li><Link to="/soup">Soup</Link></li>
        <li><Link to="/wonton">Wonton</Link></li>
        <li><Link to="/fried-rice">Fried Rice</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </div>
  );
};

export default Home;