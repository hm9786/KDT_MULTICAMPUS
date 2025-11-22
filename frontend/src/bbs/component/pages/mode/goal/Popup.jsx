import React from 'react';

const Popup = ({
  isVisible,
  taskValue,
  onTaskChange,
  onSave,
  onDelete,
  onClose,
  isAddTask,
}) => {
  if (!isVisible) return null;

  return (
    <div className="goal_popup">
      <input
        type="text"
        value={taskValue}
        onChange={(e) => onTaskChange(e.target.value)}
        placeholder={isAddTask ? "새로운 작업 입력" : undefined}
        className="goal_input"
      />
      <div className="goal_popup-buttons">
        {isAddTask ? (
          <button className="goal_button" onClick={onSave}>추가</button>
        ) : (
          <>
            <button className="goal_button" onClick={onSave}>저장</button>
            <button className="goal_button" onClick={onDelete}>삭제</button>
          </>
        )}
        <button className="goal_button" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Popup;

