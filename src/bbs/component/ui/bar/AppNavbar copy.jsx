import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa'; // 메뉴 아이콘 추가
import '../../style/Page.css';

function AppNavbar({ unreadNotifications, onNotificationClick, eventTitle, setEventTitle }) {

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // 프로필 드롭다운 상태 추가

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // MOD 버튼 참조 추가
  const profileButtonRef = useRef(null); // 프로필 버튼 참조 추가

  // MOD 드롭다운 관련 기능
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // MOD 드롭다운 상태 전환
  };


  // 프로필 드롭다운 관련 기능
  const toggleProfileDropdown = () => {
    console.log('Profile dropdown toggled');
    setShowProfileDropdown((prev) => !prev); // 프로필 드롭다운 상태 전환
  };

  // 클릭 이벤트 핸들러
  const handleClickOutside = (event) => {
    if (dropdownRef.current 
        && !dropdownRef.current.contains(event.target) 
        && buttonRef.current 
        && !buttonRef.current.contains(event.target)) {
      setShowDropdown(false); // MOD 드롭다운 닫기
    }
    if (profileButtonRef.current 
        && !profileButtonRef.current.contains(event.target)) {
      setShowProfileDropdown(false); // 프로필 드롭다운 닫기
    }
  };

  // 클릭 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Navbar expand="lg" 
            className="navbar-custom">
      <Navbar.Brand href="/" 
                    onClick={() => navigate('/')}>Home</Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav"
                       className="justify-content-between">
        
        
        {/* Left Side */}
        <div className="navbar-left">
          <Nav className="me-auto"
               style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Nav.Link onClick={() => navigate('/profile')}>My Page</Nav.Link>

            {/* MOD 드롭다운 메뉴 */}
            <div onClick={toggleDropdown}
                 className="dropdown-container"
                 ref={buttonRef} 
                 style={{ cursor: 'pointer' }}>
              <span className="mod-text">MOD</span>
            </div>
            {showDropdown && (
              <div
                ref={dropdownRef}
                style={{
                  position: 'absolute',
                  top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom : 0,
                  left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left : 0,
                  zIndex: 1050,
                  backgroundColor: '#34513A',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
                className="dropdown-menu">
                <NavDropdown.Item onClick={() => navigate('/routine')}>루틴</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/goal')}>목표</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/diary')}>다이어리</NavDropdown.Item>
              </div>
            )}
          </Nav>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          <Form className="d-flex"
                onSubmit={(e) => { e.preventDefault();
                navigate(`/search?query=${eventTitle}`); }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <Button className="custom-search-button" type="submit">Search</Button>
          </Form>

          <div className="notification-icon" 
               style={{ position: 'relative' }}>
            <Button variant="link"
                    onClick={onNotificationClick} 
                    style={{ padding: 0 }}>
              <FaLeaf size={24} />
              {unreadNotifications > 0 && (
                <Badge bg="danger" pill 
                       style={{ position: 'absolute', top: '-5px', right: '-5px' }}>
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>













          

          {/* 프로필 드롭다운 메뉴 */}
          <div onClick={toggleProfileDropdown} 
               ref={profileButtonRef}
               style={{ cursor: 'pointer' }}>
            <img src="/path/to/profile-picture.jpg" 
                 alt="프로필" 
                 className="rounded-circle" 
                 width="30" 
                 height="30" 
            />
          </div>    
          {showProfileDropdown && (
            <div
              style={{
                position: 'absolute',
                top: profileButtonRef.current ? profileButtonRef.current.getBoundingClientRect().bottom : 0,
                left: profileButtonRef.current ? profileButtonRef.current.getBoundingClientRect().left : 0,
                zIndex: 2000,
                backgroundColor: '#34513A',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
              className="dropdown-menu"
            >
              <NavDropdown.Item onClick={() => navigate('/profile')}>프로필 페이지</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/login')}>로그아웃</NavDropdown.Item>
            </div>
          )}
















        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
