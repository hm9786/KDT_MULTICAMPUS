// RoutineList.jsx
import React from 'react';

const RoutineList = ({ routines, toggleComplete, handleButtonClick }) => {
  return (
    <div className="routine-list">
      {routines.map((routine, index) => (
        <div className="routine-item" key={index}>
          <input
            type="checkbox"
            checked={routine.completed}
            onChange={() => toggleComplete(routine)}
          />
          <div className={`time ${routine.completed ? 'completed' : ''}`}>
            {routine.time ? (typeof routine.time === 'string' ? routine.time : new Date('2000-01-01T' + routine.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })) : '시간 미설정'}
          </div>
          <div className={`task ${routine.completed ? 'completed' : ''}`}>
            {routine.title || routine.task}
          </div>
          <button className="action-button" onClick={() => handleButtonClick(routine)}>
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default RoutineList;

