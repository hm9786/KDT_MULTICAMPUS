import React from 'react';
import { useState } from 'react';
import AppNavbar from '../ui/bar/AppNavbar';
import Sidebar from '../ui/bar/ProfileSidebar';

function Calendar() {
    // ?¨Ïù¥?úÎ∞î ?¥Í≥† ?´Í∏∞
    const [isOpen, setIsOpen] = useState(false);    

    // ?¨Ïù¥?úÎ∞î ?∏Îì§??
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
        <h2>Í∏∞Î≥∏ ?òÏù¥ÏßÄ (Ï∫òÎ¶∞?? </h2>
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



