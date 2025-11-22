import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from '../ui/button/HomeButton';
import { CSSTransition } from 'react-transition-group';
import WateringCan from "./home/WateringCan";

import '../style/Page.css';
import '../style/Animation.css';
import '../style/Home.css';

function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <WateringCan />
      <div className="titleContainer">

        <CSSTransition in={show} timeout={2000} classNames="fade" unmountOnExit>
          <h2 className="title">Welcome</h2>
        </CSSTransition>
      </div>

      <div className="button">
        <CSSTransition in={show} timeout={2000} classNames="fade" unmountOnExit>
          <HomeButton title="Log in" onClick={() => navigate('/login')} />
        </CSSTransition>
      </div>

      <div className="button">
        <CSSTransition in={show} timeout={2000} classNames="fade" unmountOnExit>
          <HomeButton title="Sign Up" onClick={() => navigate('/signup')} />
        </CSSTransition>
      </div>
    </div>
  );
}

export default Home;
