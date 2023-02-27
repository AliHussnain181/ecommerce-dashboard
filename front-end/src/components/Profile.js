import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="hero">
      <h1 className="title">Welcome to Your Dashboard</h1>
      <p className="subtitle">Here you can manage your store and track your sales.</p>
      <div className="cta-container">
        <button className="cta" ><Link className="cta" to='/add'>Add a Product</Link></button>
        <button className="cta"><Link className="cta" to="/graph">View Graph</Link></button>
      </div>
    </div>
  );
}

export default Profile;
