import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import '../style/SidebarModal.css';
import '../../style/SidebarModal.css';

const SidebarModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState(''); 
  const [endTime, setEndTime] = useState(''); 
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#007bff'); 

  const handleSave = () => {
    const newEvent = {
      title,
      start: `${startDate}T${startTime}`, 
      end: `${endDate}T${endTime}`, 
      description,
      color
    };
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h3>일정 추가</h3>
        
        {/* 일정 제목 */}
        <div className="modal-input">
          <label>일정 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="일정 제목을 입력하세요"
          />
        </div>

        {/* 시작 날짜와 시간 */}
        <div className="modal-input">
          <label>시작 날짜</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>시작 시간</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        {/* 종료 날짜와 시간 */}
        <div className="modal-input">
          <label>종료 날짜</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <label>종료 시간</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        {/* 일정 설명 */}
        <div className="modal-input">
          <label>일정 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="일정에 대한 설명을 입력하세요"
          />
        </div>

        {/* 색상 선택 */}
        <div className="modal-input">
          <label>색상 선택</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

SidebarModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SidebarModal;
