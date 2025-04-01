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
          <h3>일정 조회</h3>
          
          {/* 선택한 날짜 범위 표시 */}
          <p>
            {selectedRange.start} ~ {selectedRange.end || selectedRange.start}
          </p>

          {/* 선택된 날짜 또는 범위의 일정 리스트 */}
          {selectedDateEvents.length > 0 ? (
            <ul className="event-list">
              {selectedDateEvents.map((event, index) => (
                <li 
                  key={index} 
                  style={{ backgroundColor: event.color || '#007bff' }} 
                  className="event-item"
                >
                  {/* 아이콘 및 일정 유형에 따른 스타일 */}
                  <span className="event-icon">
                    {event.type === 'routine' && '📅'}
                    {event.type === 'goal' && '🎯'}
                    {event.type === 'diary' && '📖'}
                    {event.type === 'userEvent' && '📝'}
                  </span>
                  <strong>{event.title}</strong>
                  {/* 일정 시간 표시 */}
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
            <p>해당 날짜에 일정이 없습니다.</p>
          )}

          {/* 페이지 이동 버튼 */}
          <div className="modal-actions">
            <button onClick={() => navigate('/routine')}>루틴</button>
            <button onClick={() => navigate('/goal')}>목표</button>
            <button onClick={() => navigate('/diary')}>다이어리</button>
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
