import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './spring/component/pages/Home';
import Login from './spring/component/pages/home/Login';
import Signup from './spring/component/pages/home/Signup';



function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

