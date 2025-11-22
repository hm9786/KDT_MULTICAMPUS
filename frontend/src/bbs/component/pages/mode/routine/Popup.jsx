// Popup.jsx
import React from 'react';
import DatePicker from 'react-datepicker';

const Popup = ({
  popupVisible,
  selectedRoutine,
  closePopup,
  EditingTask,
  EditingTime,
  newTask,
  newTime,
  setNewTime,
  handleTaskChange,
  saveTask,
  saveTime,
  startEditingTask,
  startEditingTime,
  handleDelete,
}) => {
  if (!popupVisible || !selectedRoutine) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{`${selectedRoutine.time ? (typeof selectedRoutine.time === 'string' ? selectedRoutine.time : new Date('2000-01-01T' + selectedRoutine.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })) : '시간 미설정'} ${selectedRoutine.title || selectedRoutine.task}`}</h3>
        {EditingTask ? (
          <div>
            <input
              type="text"
              value={newTask}
              onChange={handleTaskChange}
              placeholder="변경할 내용을 입력하세요"
            />
            <button className="save-button" onClick={saveTask}>저장하기</button>
          </div>
        ) : EditingTime ? (
          <div>
            <DatePicker
              selected={newTime}
              onChange={(date) => date && setNewTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="시간"
              dateFormat="h:mm"
              inline
            />
            <div className="button-container">
              <button className="save-button" onClick={saveTime}>저장하기</button>
              <button className="close-button" onClick={closePopup}>
                닫기
              </button>
            </div>
          </div>
        ) : (
          <ul>
            <li onClick={startEditingTask}>루틴 편집하기</li>
            <li onClick={startEditingTime}>시간 편집하기</li>
            <li onClick={handleDelete}>삭제하기</li>
            <button className="close-button" onClick={closePopup}>
              닫기
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Popup;

