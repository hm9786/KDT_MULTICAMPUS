import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';

import '../../style/CalendarSidebar.css';


import LogoutModal from '../modal/LogoutModal.jsx';
import SidebarModal from '../modal/SidebarModal.jsx';

import { Button } from 'react-bootstrap';

const CalendarSidebar = ({
    isOpen,
    sidebarHandler,
    userProfile = { id: 1 },
    userPoints,
    growthStage,
    userEvents = [],
    setUserEvents,
    selectedDate,
    selectedDateRange,
}) => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState({});
    const [showSidebarModal, setShowSidebarModal] = useState(false);
    const [editEventIndex, setEditEventIndex] = useState(null);

    useEffect(() => {
        const fetchWeatherInfo = async () => {
            try {
                const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
                if (!apiKey) {
                    console.warn('OpenWeatherMap API 키가 설정되지 않았습니다.');
                    return;
                }
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: 'Seoul',
                        appid: apiKey
                    }
                });
                const weatherData = response.data;
                setWeatherInfo({
                    description: weatherData.weather[0].description,
                    temperature: (weatherData.main.temp - 273.15).toFixed(1),
                    icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
                });
            } catch (error) {
                console.error('Failed to load weather data:', error);
            }
        };
        fetchWeatherInfo();
    }, []);

    const eventsForSelectedDateRange = userEvents.filter((event) => {
        const eventDate = new Date(event.start);
        const startDate = new Date(selectedDateRange.start);
        const endDate = new Date(selectedDateRange.end || selectedDateRange.start);
        return eventDate >= startDate && eventDate <= endDate;
    });

    const handleSaveEvent = async (newEvent) => {
        const updatedEvents = [...userEvents];
        if (editEventIndex !== null) {
            updatedEvents[editEventIndex] = newEvent; 
            setEditEventIndex(null);
        } else {
            updatedEvents.push(newEvent); 
        }
        setUserEvents(updatedEvents);
        setShowSidebarModal(false);
        // TODO: Spring Boot에 이벤트 저장 API 추가 필요
    };

    const handleDeleteEvent = async (indexToDelete) => {
        const updatedEvents = userEvents.filter((_, index) => index !== indexToDelete);
        setUserEvents(updatedEvents);
        // TODO: Spring Boot에 이벤트 삭제 API 추가 필요
    };

    const handleEditEvent = (index) => {
        setEditEventIndex(index);
        setShowSidebarModal(true);
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
                <div className="user-info">
                    <img src={userProfile.image || process.env.PUBLIC_URL + '/img/profile/default-img.png'} 
                         alt="프로필" 
                        style={{marginTop:'12vh',
                                width:'10vh', 
                                height:'10vh'
                            }}
                         className="profile-picture" />
                    <span className="user-nickname">{userProfile.nickname || 'Guest'}</span>
                    
                    <img src={`/images/${growthStage}.png`}
                         alt="나무 성장 단계" 
                         className="growth-icon" />
                    <span className='cal-line'>{userPoints} Point</span>
                </div>

                <div className="weather-info">
                    {weatherInfo.icon && <img src={weatherInfo.icon} 
                    alt="날씨 아이콘" 
                    className="weather-icon" 
                />}
                    <span className='cal-line'>{weatherInfo.description}</span>
                    <span className='cal-line'>{weatherInfo.temperature}°C</span>
                </div>

                <div className="date-info">
                    <span className='cal-line'>{selectedDateRange.start ? `${selectedDateRange.start} ~ ${selectedDateRange.end || selectedDateRange.start}` : '날짜를 선택하세요'}</span>
                    {eventsForSelectedDateRange.length > 0 ? (
                        <div className="events-section">
                            <ul className="event-list">
                                {eventsForSelectedDateRange.map((event, index) => (
                                    <li key={`${event.title}-${index}`} 
                                        className="event-card" 
                                        style={{ backgroundColor: event.color || '#007bff' }}>
                                        <div className="event-details">
                                            <strong>{event.title}</strong>
                                            <div className="event-date">
                                                {new Date(event.start).toLocaleDateString(undefined, {
                                                    weekday: 'long', month: 'long', day: 'numeric'
                                                })} {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                            </div>
                                            <div className="event-content">
                                                {event.description}
                                            </div>
                                        </div>
                                        <Button variant="link" size="sm" onClick={() => handleEditEvent(index)}>✎</Button>
                                        <Button variant="link" size="sm" onClick={() => handleDeleteEvent(index)}>🗑️</Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="no-events">
                            <span className='date-line'>선택한 날짜에 일정이 없습니다.</span>
                            <Button onClick={() => setShowSidebarModal(true)}>+</Button>
                        </div>
                    )}
                </div>

                <div className="center">
                    <span onClick={logoutHandler} className="logout">로그아웃</span>
                </div>

                <LogoutModal show={showLogoutModal} onConfirm={lgyesHandler} onCancel={lgnoHandler} />
            </div>

            {showSidebarModal && (
                <SidebarModal
                    onClose={() => setShowSidebarModal(false)}
                    onSave={handleSaveEvent}
                    eventToEdit={editEventIndex !== null ? userEvents[editEventIndex] : null}
                />
            )}
        </div>
    );
};

export default CalendarSidebar;
