import React, { useState, useEffect } from 'react';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/home/events');
        if (!response.ok) throw new Error('데이터를 불러오는 데 실패했습니다.');
        
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // 완료되면 로딩 상태 종료
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>일정 목록</h2>
      {loading && <p>불러오는 중...</p>}
      {error && <p>{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.eventId}>{event.title} - {event.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;