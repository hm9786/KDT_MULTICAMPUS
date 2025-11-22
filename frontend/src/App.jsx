import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';

import Home from './bbs/component/pages/Home.jsx';
import MainPage from './bbs/component/pages/MainPage.jsx';
import Profile from './bbs/component/pages/Profile.jsx';
import Routine from './bbs/component/pages/mode/Routine.jsx';
import Goal from './bbs/component/pages/mode/Gaol.jsx';
import Diary from './bbs/component/pages/mode/Diary.jsx';

import EditPwd from './bbs/component/pages/profile/EditPwd.jsx';

import Login from './bbs/component/pages/home/Login.jsx';
import Signup from './bbs/component/pages/home/Signup.jsx';

function App() {
  // userId를 URL 파라미터 또는 localStorage에서 가져오는 래퍼 컴포넌트
  const MainPageWrapper = () => {
    const { userId: urlUserId } = useParams();
    const navigate = useNavigate();
    const storedUserId = parseInt(localStorage.getItem('userId') || '0');
    const userId = urlUserId ? parseInt(urlUserId) : storedUserId;
    
    // userId가 없으면 로그인 페이지로 리다이렉트
    useEffect(() => {
      if (!userId || userId === 0) {
        navigate('/login');
      }
    }, [userId, navigate]);
    
    if (!userId || userId === 0) {
      return null;
    }
    
    return <MainPage userId={userId} />;
  };

  const ProfileWrapper = () => {
    const { userId: urlUserId } = useParams();
    const navigate = useNavigate();
    const storedUserId = parseInt(localStorage.getItem('userId') || '0');
    const userId = urlUserId ? parseInt(urlUserId) : storedUserId;
    
    useEffect(() => {
      if (!userId || userId === 0) {
        navigate('/login');
      }
    }, [userId, navigate]);
    
    if (!userId || userId === 0) {
      return null;
    }
    
    return <Profile userId={userId} />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar/:userId" element={<MainPageWrapper />} />
          <Route path="/profile/:userId" element={<ProfileWrapper />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/goal" element={<Goal />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/editpwd" element={<EditPwd />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
