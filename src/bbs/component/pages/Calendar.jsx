import React from 'react';
import { useState } from 'react';
import AppNavbar from '../ui/bar/AppNavbar';
import Sidebar from '../ui/bar/ProfileSidebar';

function Calendar() {
    // 사이드바 열고 닫기
    const [isOpen, setIsOpen] = useState(false);    

    // 사이드바 핸들러
    const sidebarHandler = () => {
        setIsOpen(!isOpen);
    };
      
  return (

    <div>

      <AppNavbar/>
      <Sidebar
                isOpen={isOpen} 
                sidebarHandler={sidebarHandler} 
            /> 
      <div style={{ ...styles.container, marginLeft: isOpen ? '-125px' : '0' }}>
        <h2>기본 페이지 (캘린더) </h2>
      </div>

    </div>

  );
}

const styles = {
  container: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: '60px',
    height: '100vh', 
    width: '100%' ,
    transition: 'all .35s',
  },
};


export default Calendar;



