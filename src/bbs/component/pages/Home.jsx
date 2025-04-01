import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from '../ui/button/HomeButton';
import { CSSTransition } from 'react-transition-group';
import WateringCan from "./home/WateringCan";

import '../style/Page.css';
import '../style/Animation.css';
import '../style/Home.css'; // CSS 파일을 임포트

function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 7000); // 7초 후에 show 상태 설정

    return () => clearTimeout(timer); // 타이머 정리
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


