import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './bbs/component/pages/Home.jsx';
import Calendar from './bbs/component/pages/Calendar.jsx';
import Profile from './bbs/component/pages/Profile.jsx';

import EditPwd from './bbs/component/pages/profile/EditPwd.jsx';

import Login from './bbs/component/pages/home/Login.jsx';
import Signup from './bbs/component/pages/home/Signup.jsx';

import Diary from './bbs/component/pages/mode/Diary.jsx';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/calendar" element={ <Calendar /> }/>
          { 
            // <Route path="/profile" element={ <Profile /> }/>
            <Route path="/profile/:userId" element={<Profile />} />
          }

          <Route path="/login" element={ <Login /> }/>
          <Route path="/signup" element={ <Signup /> }/>

          <Route path="/editpwd" element={<EditPwd />} />


          <Route path="/diary" element={<Diary />} />



        </Routes>
      </div>
    </Router>
  );
}
export default App;