import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ date, setDate, cumulativeTimeByDate }) => {
  return (
    <div className="goal_calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) => {
          const formattedDate = date.toISOString().split('T')[0];
          const cumulativeTime = cumulativeTimeByDate[formattedDate] || 0;
          const hours = Math.min(cumulativeTime / (5 * 3600), 1); // 5시간 이상은 최대 1로 제한
          return `goal_tile-color-${Math.floor(hours * 5)}`; // 클래스 이름 반환 (0~5 범위)
        }}
        tileContent={({ date }) => {
          return null;
        }}
        className="calendar"
        formatDay={(locale, date) => date.getDate()} // '일' 없이 날짜만 표시
      />
    </div>
  );
};

export default CalendarComponent;