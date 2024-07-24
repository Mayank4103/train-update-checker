import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import './box.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="box">
        <h1>Home Page</h1>
        <p>"This app provides live updates of trains and also provides PNR status of tickets."</p>
        
        <div className="status-section">
          <div className="train-status">
            <h2>
              <Link to="/train-status">Train Status</Link>
            </h2>
            <p>Live updates of trains will be shown here.</p>
          </div>
          
          <div className="pnr-status">
            <h2>
              <Link to="/pnr-status">PNR Status</Link>
            </h2>
            <p>PNR status of tickets will be shown here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
