import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Page.css';
import CheckPwdModal from '../modal/CheckPwdModal';
import DeleteUserModal from '../modal/DeleteUserModal';
import ByePwdModal from '../modal/ByePwdModal';
import LogoutModal from '../modal/LogoutModal';


const Sidebar = ({ isOpen, sidebarHandler }) => {
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeletePwdModal, setShowDeletePwdModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const checkpwdHandler = () => {
        setShowEditModal(true);
    };

    const confirmHandler = () => {
        setShowEditModal(false);
        navigate('/editpwd');
    };

    const cancelEditHandler = () => {
        setShowEditModal(false);
    };

    const deleteuserHandler = () => {
        setShowDeleteModal(true);
    };

    const yesHandler = () => {
        setShowDeleteModal(false);
        setShowDeletePwdModal(true);
    };

    const noHandler = () => {
        setShowDeleteModal(false);
    };

    const conHandler = () => {
        setShowDeletePwdModal(false);
        navigate('/goodbye');
    };

    const canHandler = () => {
        setShowDeletePwdModal(false);
    };

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
                <h2 className="title">My Page</h2>
                <span onClick={() => navigate('/calendar')} className="line">My calendar</span>                
                <span onClick={checkpwdHandler} className="line">비밀번호 수정</span>
                <span onClick={deleteuserHandler} className="line">회원 탈퇴</span>
                <div className="flexGrow" />
                <div className="center">
                    <span onClick={logoutHandler} className="logout">로그아웃</span>
                </div>
             

                {/* 모달 */}
                <CheckPwdModal show={showEditModal} onConfirm={confirmHandler} onCancel={cancelEditHandler} />
                <DeleteUserModal show={showDeleteModal} onConfirm={yesHandler} onCancel={noHandler} />
                <ByePwdModal show={showDeletePwdModal} onConfirm={conHandler} onCancel={canHandler} />
                <LogoutModal show={showLogoutModal} onConfirm={lgyesHandler} onCancel={lgnoHandler} />
            </div>
        </div>
        
    );
}

export default Sidebar;
