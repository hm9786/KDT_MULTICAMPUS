import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Page.css';
import LogoutModal from '../modal/LogoutModal';


const RoutineSidebar = ({ isOpen, sidebarHandler }) => {
    
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // 로그 ?�웃
    const logoutHandler = () => {
        setShowLogoutModal(true);
    };

    const lgyesHandler = () => {
        setShowLogoutModal(false);
        navigate('/');
    };

    const lgnoHandler = () => {
        setShowLogoutModal(false);
    };

    return (
        <div>
            <div className="menuicon">
                <input
                    type="checkbox"
                    id="menuicon"
                    onChange={sidebarHandler}
                    checked={isOpen}
                />
                <label htmlFor="menuicon">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <span className="sidebar-title">Routine</span>
                <span 
                        onClick={() => navigate('/calendar')} 
                        className="line"
                >My calendar</span>
                
                <span   
                        onClick={()=> navigate('/goal')}
                        className='line'
                >?�늘 ?�의 목표</span>

                
                <span 
                        onClick={()=> navigate('/diary')}
                        className='line'
                >?�늘 ?�의 ?�기</span>
                
                
                <div className="flexGrow" />
                <div className="center">
                    <span onClick={logoutHandler} className="logout">로그?�웃</span>
                </div>
             

                {/* 모달 */}
                <LogoutModal show={showLogoutModal} onConfirm={lgyesHandler} onCancel={lgnoHandler} />
            </div>
        </div>
        
    );
}

export default RoutineSidebar;
