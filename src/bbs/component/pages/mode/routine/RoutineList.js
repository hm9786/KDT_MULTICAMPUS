// RoutineList.js
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
            {routine.time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
          <div className={`task ${routine.completed ? 'completed' : ''}`}>
            {routine.task}
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