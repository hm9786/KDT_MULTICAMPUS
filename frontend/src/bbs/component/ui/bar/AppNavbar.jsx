import { useState, useRef, useEffect } from 'react';
import { FaLeaf } from 'react-icons/fa'; // ыйФыЙ┤ ?ДьЭ┤ь╜?ь╢Фъ?
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

  // MOD ?Ьыбн?дьЪ┤ ?аъ? ?иьИШ
  const toggleModDropdown = () => {
    setShowModDropdown((prev) => !prev);
  };

  // Profile ?Ьыбн?дьЪ┤ ?аъ? ?иьИШ
  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // ?Ьыбн?дьЪ┤ ?╕ы? ?┤ыжн ???лэЮШ ь▓Шыжм
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

        {/* MOD ?Ьыбн?дьЪ┤ ы▓ДэК╝ */}
        <span
          className="nav-link"
          ref={modButtonRef}
          onClick={toggleModDropdown}
          style={{ cursor: 'pointer' }}
        >
          MOD
        </span>

        {/* MOD ?Ьыбн?дьЪ┤ ыйФыЙ┤ */}
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
            <div className="nav-link" onClick={() => navigate('/routine')}>ыгиэЛ┤</div>
            <hr />
            <div className="nav-link" onClick={() => navigate('/goal')}>ыкйэСЬ</div>
            <hr />
            <div className="nav-link" onClick={() => navigate('/diary')}>?дьЭ┤?┤ыжм</div>
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
        
        {/* ?Мыж╝ ?ДьЭ┤ь╜?*/}
        <span className="nav-link" onClick={onNotificationClick} style={{ cursor: 'pointer' }}>
          <FaLeaf size={20} />
          {unreadNotifications > 0 && <span className="notification-badge">{unreadNotifications}</span>}
        </span>

        {/* Profile ?Ьыбн?дьЪ┤ ы▓ДэК╝ */}
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

        {/* Profile ?Ьыбн?дьЪ┤ ыйФыЙ┤ */}
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
            <div className="nav-link" onClick={() => navigate('/profile')}>?ДыбЬ???ШьЭ┤ьзА</div>
            <hr />
            <div className="nav-link"  onClick={logoutHandler} >ыбЬъ╖╕?ДьЫГ</div>

            <LogoutModal show={showLogoutModal} onConfirm={lgyesHandler} onCancel={lgnoHandler} />

          </div>
        )}
      </div>
    </div>
  );
}

export default AppNavbar;
