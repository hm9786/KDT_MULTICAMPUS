import { useState, useRef, useEffect } from 'react';
import { FaLeaf } from 'react-icons/fa'; // 메뉴 아이콘 추가
import '../../style/Page.css';
import { useNavigate } from 'react-router-dom';

import LogoutModal from '../modal/LogoutModal';

function AppNavbar({ unreadNotifications, onNotificationClick, eventTitle, setEventTitle }) {
  const navigate = useNavigate();
  const [showModDropdown, setShowModDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const modButtonRef = useRef(null);
  const modDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // MOD 드롭다운 토글 함수
  const toggleModDropdown = () => {
    setShowModDropdown((prev) => !prev);
  };

  // Profile 드롭다운 토글 함수
  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // 드롭다운 외부 클릭 시 닫힘 처리
  const handleClickOutside = (event) => {
    if (
      modDropdownRef.current &&
      !modDropdownRef.current.contains(event.target) &&
      modButtonRef.current &&
      !modButtonRef.current.contains(event.target)
    ) {
      setShowModDropdown(false);
    }
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target) &&
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target)
    ) {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
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
    <div className="navbar-custom">
      {/* Left Side */}
      <div className="navbar-left">
        <span className="navbar-brand" onClick={() => navigate('/')}>
          Home
        </span>
        <span className="nav-link" onClick={() => navigate('/profile')}>
          My Page
        </span>

        {/* MOD 드롭다운 버튼 */}
        <span
          className="nav-link"
          ref={modButtonRef}
          onClick={toggleModDropdown}
          style={{ cursor: 'pointer' }}
        >
          MOD
        </span>

        {/* MOD 드롭다운 메뉴 */}
        {showModDropdown && (
          <div
            className="dropdown-menu"
            ref={modDropdownRef}
            style={{
              position: 'absolute',
              top: modButtonRef.current
                ? modButtonRef.current.getBoundingClientRect().bottom + window.scrollY
                : 0,
              left: modButtonRef.current
                ? modButtonRef.current.getBoundingClientRect().left
                : 0,
              backgroundColor: '#34513A',
              borderRadius: '0.5rem',
              padding: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 1050,
            }}
          >
            <div className="nav-link" onClick={() => navigate('/routine')}>루틴</div>
            <hr />
            <div className="nav-link" onClick={() => navigate('/goal')}>목표</div>
            <hr />
            <div className="nav-link" onClick={() => navigate('/diary')}>다이어리</div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <input
          className="me-2"
          type="text"
          placeholder="Search"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <button
          className="custom-search-button"
          onClick={() => navigate(`/search?query=${eventTitle}`)}
        >
          Search
        </button>
        
        {/* 알림 아이콘 */}
        <span className="nav-link" onClick={onNotificationClick} style={{ cursor: 'pointer' }}>
          <FaLeaf size={20} />
          {unreadNotifications > 0 && <span className="notification-badge">{unreadNotifications}</span>}
        </span>

        {/* Profile 드롭다운 버튼 */}
        <span
          className="nav-link"
          ref={profileButtonRef}
          onClick={toggleProfileDropdown}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/path/to/profile-picture.jpg"
            alt="Profile"
            className="profile-picture"
          />
        </span>

        {/* Profile 드롭다운 메뉴 */}
        {showProfileDropdown && (
          <div
            className="dropdown-menu"
            ref={profileDropdownRef}
            style={{
              position: 'absolute',
              top: profileButtonRef.current
                ? profileButtonRef.current.getBoundingClientRect().bottom + window.scrollY
                : 0,
              left: profileButtonRef.current
                ? profileButtonRef.current.getBoundingClientRect().left
                : 0,
              backgroundColor: '#34513A',
              borderRadius: '0.5rem',
              padding: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 1050,
            }}
          >
            <div className="nav-link" onClick={() => navigate('/profile')}>프로필 페이지</div>
            <hr />
            <div className="nav-link"  onClick={logoutHandler} >로그아웃</div>

            <LogoutModal show={showLogoutModal} onConfirm={lgyesHandler} onCancel={lgnoHandler} />

          </div>
        )}
      </div>
    </div>
  );
}

export default AppNavbar;
