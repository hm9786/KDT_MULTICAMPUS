import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Page.css';
import LogoutModal from '../modal/LogoutModal';


const GoalSidebar = ({ isOpen, sidebarHandler }) => {
    
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // 로그 아웃
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
                <span className="sidebar-title">Goal</span>
                <span 
                        onClick={() => navigate('/calendar')} 
                        className="line"
                >My calendar</span>
                
                <span   
                        onClick={()=> navigate('/routine')}
                        className='line'
                >오늘 나의 루틴</span>

                
                <span 
                        onClick={()=> navigate('/diary')}
                        className='line'
                >오늘 나의 일기</span>
                
                
                <div className="flexGrow" />
                <div className="center">
                    <span onClick={logoutHandler} className="logout">로그아웃</span>
                </div>
             

                {/* 모달 */}
                <LogoutModal show={showLogoutModal} onConfirm={lgyesHandler} onCancel={lgnoHandler} />
            </div>
        </div>
        
    );
}

export default GoalSidebar;
