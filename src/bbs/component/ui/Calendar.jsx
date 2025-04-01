import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';
import '../style/Calendar.css';
import '../style/Page.css';

function Calendar({ userEvents = [], holidays = [], onDateClick, onSelect, onEventClick }) {

  
  const combinedEvents = [
    ...holidays.map((holiday) => ({ ...holiday, color: 'red' })), 
    ...userEvents.map((event) => ({
      ...event,
      color: event.type === 'routine' ? 'green' :
             event.type === 'goal' ? 'blue' :
             event.type === 'diary' ? 'purple' : 'gray',
      icon: event.type === 'routine' ? '📅' :
            event.type === 'goal' ? '🎯' :
            event.type === 'diary' ? '📖' : '📝'
    }))
  ];

  return (
    <div className="calendar">
      {combinedEvents.length > 0 ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={combinedEvents}
          dateClick={onDateClick}
          selectable={true}
          selectMirror={true}
          select={onSelect}
          displayEventTime={userEvents.some((event) => event.start?.includes('T'))}
          height="auto"
          eventContent={(eventInfo) => (
            <div>
              <span>{eventInfo.event.extendedProps.icon}</span> {eventInfo.event.title}
            </div>
          )}
          eventClick={(info) => {
            info.jsEvent.preventDefault();
            onEventClick(info.event);
          }}
        />
      ) : (
        <p>Loading events...</p>
      )}
    </div>
  );
}

Calendar.propTypes = {
  userEvents: PropTypes.array.isRequired,
  holidays: PropTypes.array.isRequired,
  onDateClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEventClick: PropTypes.func, 
};

export default Calendar;
