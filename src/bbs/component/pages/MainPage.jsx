// MainPage.jsx
import React, { useState, useEffect } from 'react';
import Calendar from '../ui/Calendar';
import AppNavbar from '../ui/bar/AppNavbar';
import CalendarSidebar from '../ui/bar/CalendarSidebar';
import EventModal from '../ui/modal/EventModal';
import axios from 'axios';
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

  const scheduleNotifications = (events) => {
    const now = new Date();
    events.forEach((event) => {
      const eventStart = new Date(event.start);
      const notificationTimes = [
        { time: new Date(eventStart - 30 * 60000), message: `30분 후 ${event.title} 시작` },
        { time: new Date(eventStart - 15 * 60000), message: `15분 후 ${event.title} 시작` },
        { time: new Date(eventStart - 5 * 60000), message: `5분 후 ${event.title} 시작` },
      ];

      notificationTimes.forEach((notification) => {
        const delay = notification.time - now;
        if (delay > 0) {
          setTimeout(() => {
            setNotifications(prev => [...prev, notification.message]);
          }, delay);
        }
      });
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/home?userId=${userId}`);
        const { routineEvents, goalEvents, diaryEvents, points } = response.data;

        const allEvents = [
          ...routineEvents.map(event => ({ ...event, type: 'routine', color: 'green', icon: '📅' })),
          ...goalEvents.map(event => ({ ...event, type: 'goal', color: 'blue', icon: '🎯' })),
          ...diaryEvents.map(event => ({ ...event, type: 'diary', color: 'purple', icon: '📖' }))
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
        const response = await fetch(
          'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey=YOUR_API_KEY&solYear=2024&numOfRows=100'
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
      const response = await axios.post('/home/events', { ...newEvent, userId });
      setUserEvents([...userEvents, response.data]);
      updateUserPoints(10);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      await axios.put(`/home/events/${updatedEvent.id}`, updatedEvent);
      setUserEvents(userEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
      updateUserPoints(5);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`/home/events/${eventId}`);
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
        userEvents={userEvents}
        setUserEvents={setUserEvents}
        selectedDate={selectedDate}
        selectedDateRange={selectedDateRange}
        setSelectedDate={setSelectedDate}
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
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
