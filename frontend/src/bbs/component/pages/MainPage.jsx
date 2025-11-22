// MainPage.jsx
import React, { useState, useEffect } from 'react';
import Calendar from '../ui/Calendar';
import AppNavbar from '../ui/bar/AppNavbar';
import CalendarSidebar from '../ui/bar/CalendarSidebar';
import EventModal from '../ui/modal/EventModal';
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';
import '../style/MainPage.css';

function MainPage({ userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState({ start: '', end: '' });
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({ start: '', end: '' });
  const [selectedDate, setSelectedDate] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [growthStage, setGrowthStage] = useState('seed');
  const [notifications, setNotifications] = useState([]);

  const sidebarHandler = () => {
    setIsOpen(!isOpen);
  };

  const determineGrowthStage = (points) => {
    if (points >= 1050) return 'fruit';
    if (points >= 900) return 'flower';
    if (points >= 600) return 'tree';
    if (points >= 300) return 'sapling';
    if (points >= 150) return 'sprout';
    return 'seed';
  };

  const updateUserPoints = (points) => {
    const updatedPoints = userPoints + points;
    setUserPoints(updatedPoints);
    setGrowthStage(determineGrowthStage(updatedPoints));
  };

  const handleDateClick = (arg) => {
    const date = arg.dateStr;
    setSelectedDate(date);
    const eventsForDate = userEvents.filter(event => event.start === date);
    setSelectedRange({ start: date, end: '' });
    setSelectedDateEvents(eventsForDate);
    setShowEventModal(true);
    setSelectedDateRange({ start: date, end: date });
  };

  const handleSelect = (selectionInfo) => {
    const { startStr, endStr } = selectionInfo;
    const correctedEndDate = new Date(new Date(endStr).getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    setSelectedRange({ start: startStr, end: correctedEndDate });
    setShowEventModal(true);
    setSelectedDateRange({ start: startStr, end: correctedEndDate });
  };

  const handleEventClick = (event) => {
    const eventsForDate = userEvents.filter(e => e.start === event.startStr);
    setSelectedDateEvents(eventsForDate);
    setShowEventModal(true);
  };

  useEffect(() => {
    // 알림 권한 요청
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const scheduleNotifications = (events) => {
    const now = new Date();
    events.forEach((event) => {
      if (event.start_time) {
        const [hours, minutes] = event.start_time.split(':');
        const eventStart = new Date(event.start);
        eventStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const notificationTimes = [
          { time: new Date(eventStart.getTime() - 30 * 60000), message: `30분 전 ${event.title} 시작` },
          { time: new Date(eventStart.getTime() - 15 * 60000), message: `15분 전 ${event.title} 시작` },
          { time: new Date(eventStart.getTime() - 5 * 60000), message: `5분 전 ${event.title} 시작` },
        ];

        notificationTimes.forEach((notification) => {
          const delay = notification.time.getTime() - now.getTime();
          if (delay > 0) {
            setTimeout(() => {
              if (Notification.permission === 'granted') {
                new Notification('일정 알림', {
                  body: notification.message,
                  icon: '/logo192.png'
                });
              }
              setNotifications(prev => [...prev, notification.message]);
            }, delay);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (!userId || userId === 0) {
      console.warn('userId가 유효하지 않습니다:', userId);
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/home?userId=${userId}`);
        const { routineEvents = [], goalEvents = [], diaryEvents = [], points = 0 } = response.data || {};

        const allEvents = [
          ...(routineEvents || []).map(event => ({ ...event, type: 'routine', color: event.color || 'green', icon: '📅' })),
          ...(goalEvents || []).map(event => ({ ...event, type: 'goal', color: event.color || 'blue', icon: '🎯' })),
          ...(diaryEvents || []).map(event => ({ ...event, type: 'diary', color: event.color || 'purple', icon: '📝' }))
        ];

        setUserEvents(allEvents);
        setUserPoints(points || 0);
        setGrowthStage(determineGrowthStage(points || 0));
      } catch (error) {
        console.error('Error fetching user data:', error);
        // API 호출 실패 시 빈 배열로 설정하여 에러 방지
        setUserEvents([]);
        setUserPoints(0);
        setGrowthStage('seed');
        
        // 사용자에게 에러 알림 (필요시)
        if (error.response) {
          if (error.response.status === 404) {
            console.warn('사용자 데이터를 찾을 수 없습니다.');
          } else if (error.response.status === 500) {
            console.error('서버 오류가 발생했습니다.');
          }
        } else if (error.request) {
          console.error('백엔드 서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해주세요.');
        }
      }
    };

    const fetchHolidays = async () => {
      try {
        const apiKey = import.meta.env.VITE_PUBLIC_DATA_API_KEY;
        if (!apiKey || apiKey === 'YOUR_API_KEY') {
          console.warn('공공데이터포털 API 키를 설정하지 않았습니다. 공휴일 정보를 불러올 수 없습니다.');
          return;
        }
        const response = await fetch(
          `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey=${apiKey}&solYear=2024&numOfRows=100`
        );
        const textData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "text/xml");

        const items = xmlDoc.getElementsByTagName("item");
        const uniqueHolidays = Array.from(items).map(item => ({
          title: item.getElementsByTagName("dateName")[0].textContent,
          start: `${item.getElementsByTagName("locdate")[0].textContent.slice(0, 4)}-${item.getElementsByTagName("locdate")[0].textContent.slice(4, 6)}-${item.getElementsByTagName("locdate")[0].textContent.slice(6, 8)}`,
          display: 'background',
          className: 'holiday-event'
        }));

        setHolidays(uniqueHolidays);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchUserData();
    fetchHolidays();
  }, [userId]);

  useEffect(() => {
    scheduleNotifications(userEvents);
  }, [userEvents]);

  const addEvent = async (newEvent) => {
    try {
      const scheduleData = {
        user_UN: userId,
        title: newEvent.title,
        description: newEvent.description || '',
        start_date: newEvent.start,
        end_date: newEvent.end || newEvent.start,
        start_time: newEvent.start_time || null,
        end_time: newEvent.end_time || null,
        location: newEvent.location || '',
        latitude: newEvent.latitude || null,
        longitude: newEvent.longitude || null,
        mode: newEvent.mode || 'default',
        color: newEvent.color || '#667eea'
      };
      const response = await axios.post(`${API_BASE_URL}/schedules`, scheduleData);
      if (response.data) {
        const addedEvent = {
          id: response.data.schedule_id,
          title: response.data.title,
          start: response.data.start_date,
          end: response.data.end_date,
          color: response.data.color || '#667eea',
          mode: response.data.mode || 'default'
        };
        setUserEvents([...userEvents, addedEvent]);
        updateUserPoints(10);
      } else {
        console.error('이벤트 추가 응답 데이터가 없습니다.');
        alert('이벤트 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response) {
        if (error.response.status === 404) {
          alert('서버를 찾을 수 없습니다. 백엔드가 실행 중인지 확인해주세요.');
        } else {
          alert('이벤트 추가 중 오류가 발생했습니다.');
        }
      } else {
        alert('백엔드 서버에 연결할 수 없습니다.');
      }
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const scheduleData = {
        schedule_id: updatedEvent.id,
        user_UN: userId,
        title: updatedEvent.title,
        description: updatedEvent.description || '',
        start_date: updatedEvent.start,
        end_date: updatedEvent.end || updatedEvent.start,
        start_time: updatedEvent.start_time || null,
        end_time: updatedEvent.end_time || null,
        location: updatedEvent.location || '',
        latitude: updatedEvent.latitude || null,
        longitude: updatedEvent.longitude || null,
        mode: updatedEvent.mode || 'default',
        color: updatedEvent.color || '#667eea'
      };
      const response = await axios.put(`${API_BASE_URL}/schedules/${updatedEvent.id}`, scheduleData);
      if (response.status === 200) {
        setUserEvents(userEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
        updateUserPoints(5);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      if (error.response) {
        if (error.response.status === 404) {
          alert('서버를 찾을 수 없습니다. 백엔드가 실행 중인지 확인해주세요.');
        } else {
          alert('이벤트 수정 중 오류가 발생했습니다.');
        }
      } else {
        alert('백엔드 서버에 연결할 수 없습니다.');
      }
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`${API_BASE_URL}/schedules/${eventId}`);
      setUserEvents(userEvents.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <AppNavbar notifications={notifications} />

      <CalendarSidebar
        isOpen={isOpen}
        sidebarHandler={sidebarHandler}
        userProfile={{ nickname: 'Guest', image: null }}
        userEvents={userEvents}
        setUserEvents={setUserEvents}
        selectedDate={selectedDate}
        selectedDateRange={selectedDateRange}
        userPoints={userPoints}
        growthStage={growthStage}
      />
      
      <div className={`container ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="calendar-wrapper">
          <Calendar
            userEvents={userEvents}
            holidays={holidays}
            onDateClick={handleDateClick}
            onSelect={handleSelect}
            onEventClick={handleEventClick}
          />
        </div>
      </div>

      {showEventModal && (
        <EventModal
          show={showEventModal}
          onClose={() => setShowEventModal(false)}
          selectedDateEvents={selectedDateEvents}
          selectedRange={selectedRange}
        />
      )}
    </div>
  );
}

export default MainPage;
