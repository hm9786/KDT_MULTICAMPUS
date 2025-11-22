// EventModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import '../style/EventModal.css';
import '../../style/EventModal.css';

const EventModal = ({ show, onClose, selectedDateEvents = [], selectedRange }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h3>?¼ì • ì¡°íšŒ</h3>
          
          {/* ? íƒ??? ì§œ ë²”ìœ„ ?œì‹œ */}
          <p>
            {selectedRange.start} ~ {selectedRange.end || selectedRange.start}
          </p>

          {/* ? íƒ??? ì§œ ?ëŠ” ë²”ìœ„???¼ì • ë¦¬ìŠ¤??*/}
          {selectedDateEvents.length > 0 ? (
            <ul className="event-list">
              {selectedDateEvents.map((event, index) => (
                <li 
                  key={index} 
                  style={{ backgroundColor: event.color || '#007bff' }} 
                  className="event-item"
                >
                  {/* ?„ì´ì½?ë°??¼ì • ? í˜•???°ë¥¸ ?¤í???*/}
                  <span className="event-icon">
                    {event.type === 'routine' && '?“…'}
                    {event.type === 'goal' && '?¯'}
                    {event.type === 'diary' && '?“–'}
                    {event.type === 'userEvent' && '?“'}
                  </span>
                  <strong>{event.title}</strong>
                  {/* ?¼ì • ?œê°„ ?œì‹œ */}
                  {event.startTime && event.endTime && (
                    <p className="event-time">
                      {`${event.startTime} - ${event.endTime}`}
                    </p>
                  )}
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>?´ë‹¹ ? ì§œ???¼ì •???†ìŠµ?ˆë‹¤.</p>
          )}

          {/* ?˜ì´ì§€ ?´ë™ ë²„íŠ¼ */}
          <div className="modal-actions">
            <button onClick={() => navigate('/routine')}>ë£¨í‹´</button>
            <button onClick={() => navigate('/goal')}>ëª©í‘œ</button>
            <button onClick={() => navigate('/diary')}>?¤ì´?´ë¦¬</button>
          </div>
        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedDateEvents: PropTypes.array,
  selectedRange: PropTypes.object.isRequired,
};

export default EventModal;
