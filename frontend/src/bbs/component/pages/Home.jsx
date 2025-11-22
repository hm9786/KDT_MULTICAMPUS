import React from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from '../ui/button/CommonButton';

import '../style/Page.css';
import '../style/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="home-card">
        <h2 className="home-title">Welcome</h2>
        <div className="home-button-container">
          <CommonButton title="Log in" onClick={() => navigate('/login')} fullWidth={true} />
        </div>
      </div>
    </div>
  );
}

export default Home;
