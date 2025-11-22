import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa'; // Î©îÎâ¥ ?ÑÏù¥ÏΩ?Ï∂îÍ?
import '../../style/Page.css';

function AppNavbar({ unreadNotifications, onNotificationClick, eventTitle, setEventTitle }) {

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // ?ÑÎ°ú???úÎ°≠?§Ïö¥ ?ÅÌÉú Ï∂îÍ?

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null); // MOD Î≤ÑÌäº Ï∞∏Ï°∞ Ï∂îÍ?
  const profileButtonRef = useRef(null); // ?ÑÎ°ú??Î≤ÑÌäº Ï∞∏Ï°∞ Ï∂îÍ?

  // MOD ?úÎ°≠?§Ïö¥ Í¥Ä??Í∏∞Îä•
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // MOD ?úÎ°≠?§Ïö¥ ?ÅÌÉú ?ÑÌôò
  };


  // ?ÑÎ°ú???úÎ°≠?§Ïö¥ Í¥Ä??Í∏∞Îä•
  const toggleProfileDropdown = () => {
    console.log('Profile dropdown toggled');
    setShowProfileDropdown((prev) => !prev); // ?ÑÎ°ú???úÎ°≠?§Ïö¥ ?ÅÌÉú ?ÑÌôò
  };

  // ?¥Î¶≠ ?¥Î≤§???∏Îì§??
  const handleClickOutside = (event) => {
    if (dropdownRef.current 
        && !dropdownRef.current.contains(event.target) 
        && buttonRef.current 
        && !buttonRef.current.contains(event.target)) {
      setShowDropdown(false); // MOD ?úÎ°≠?§Ïö¥ ?´Í∏∞
    }
    if (profileButtonRef.current 
        && !profileButtonRef.current.contains(event.target)) {
      setShowProfileDropdown(false); // ?ÑÎ°ú???úÎ°≠?§Ïö¥ ?´Í∏∞
    }
  };

  // ?¥Î¶≠ ?¥Î≤§??Î¶¨Ïä§???±Î°ù
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

            {/* MOD ?úÎ°≠?§Ïö¥ Î©îÎâ¥ */}
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
                <NavDropdown.Item onClick={() => navigate('/routine')}>Î£®Ìã¥</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/goal')}>Î™©Ìëú</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate('/diary')}>?§Ïù¥?¥Î¶¨</NavDropdown.Item>
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













          

          {/* ?ÑÎ°ú???úÎ°≠?§Ïö¥ Î©îÎâ¥ */}
          <div onClick={toggleProfileDropdown} 
               ref={profileButtonRef}
               style={{ cursor: 'pointer' }}>
            <img src="/path/to/profile-picture.jpg" 
                 alt="?ÑÎ°ú?? 
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
              <NavDropdown.Item onClick={() => navigate('/profile')}>?ÑÎ°ú???òÏù¥ÏßÄ</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/login')}>Î°úÍ∑∏?ÑÏõÉ</NavDropdown.Item>
            </div>
          )}
















        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
