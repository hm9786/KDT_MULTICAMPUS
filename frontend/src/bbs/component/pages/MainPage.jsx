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
    // ?�림 권한 ?�청
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
          { time: new Date(eventStart.getTime() - 30 * 60000), message: `30�???${event.title} ?�작` },
          { time: new Date(eventStart.getTime() - 15 * 60000), message: `15�???${event.title} ?�작` },
          { time: new Date(eventStart.getTime() - 5 * 60000), message: `5�???${event.title} ?�작` },
        ];

        notificationTimes.forEach((notification) => {
          const delay = notification.time.getTime() - now.getTime();
          if (delay > 0) {
            setTimeout(() => {
              if (Notification.permission === 'granted') {
                new Notification('?�정 ?�림', {
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
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/home?userId=${userId}`);
        const { routineEvents, goalEvents, diaryEvents, points } = response.data;

        const allEvents = [
          ...routineEvents.map(event => ({ ...event, type: 'routine', color: event.color || 'green', icon: '?��' })),
          ...goalEvents.map(event => ({ ...event, type: 'goal', color: event.color || 'blue', icon: '?��' })),
          ...diaryEvents.map(event => ({ ...event, type: 'diary', color: event.color || 'purple', icon: '?��' }))
        ];

        setUserEvents(allEvents);
        setUserPoints(points || 0);
        setGrowthStage(determineGrowthStage(points || 0));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchHolidays = async () => {
      try {
        const apiKey = import.meta.env.VITE_PUBLIC_DATA_API_KEY;
        if (!apiKey || apiKey === 'YOUR_API_KEY') {
          console.warn('공공?�이?�포??API ?��? ?�정?��? ?�았?�니?? 공휴???�보�?불러?????�습?�다.');
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
      const addedEvent = {
        id: response.data.schedule_id,
        title: response.data.title,
        start: response.data.start_date,
        end: response.data.end_date,
        color: response.data.color,
        mode: response.data.mode
      };
      setUserEvents([...userEvents, addedEvent]);
      updateUserPoints(10);
    } catch (error) {
      console.error('Error adding event:', error);
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
      await axios.put(`${API_BASE_URL}/schedules/${updatedEvent.id}`, scheduleData);
      setUserEvents(userEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
      updateUserPoints(5);
    } catch (error) {
      console.error('Error updating event:', error);
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
