import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../../utils/api';
import '../../style/Goal.css';
import '../../style/GoalCalendar.css';

import axios from 'axios';

import AppNavbar from '../../ui/bar/AppNavbar';
import GoalSidebar from '../../ui/bar/GoalSidebar';

import Popup from './goal/Popup.jsx';
import Timer from './goal/Timer.jsx';
import CalendarComponent from './goal/CalendarComponent.jsx';
import TimeGraph from './goal/TimeGraph';


import {
  GoalData,
  totalTimeFromDB,
  TasksForDate,
  CumulativeTime,
  saveTotalTimeToDB,
} from './goal/api.js';

const Goal = () => {
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const [goalId, setGoalId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [addTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [goalTitle, setGoalTitle] = useState('');
  const [targetDate, setTargetDate] = useState(null);
  const [cumulativeTimeByDate, setCumulativeTimeByDate] = useState({});

  const [isOpen, setIsOpen] = useState(false);

    // 사이드바 핸들러
    const sidebarHandler = () => {
        setIsOpen(!isOpen);
    };

  //목표 데이터를 가져옴
  useEffect(() => {
    const loadGoalData = async () => {
      if (!userId) return;

      const data = await GoalData(userId);
      setGoalId(data.goalId);
      setGoalTitle(data.goalTitle);
      setTargetDate(data.targetDate ? new Date(data.targetDate) : null);
    };

    loadGoalData();
  }, [userId]);

  // 목표가 설정되어 있을 때만 작업 데이터 로드
  useEffect(() => {
    const loadTasks = async () => {
      if (!goalId) return;

      const today = date.toISOString().split('T')[0];
      const tasksData = await TasksForDate(goalId, today);
      setTasks(tasksData);

      // 오늘의 총 시간 가져오기
      const todayTotalTime = await totalTimeFromDB(goalId, today);
      setTotalTime(todayTotalTime);
      setIsLoaded(true);
    };

    loadTasks();
  }, [goalId, date]);

  // 누적 시간 데이터 가져오기
  useEffect(() => {
    const loadCumulativeTime = async () => {
      if (!goalId) return;

      const month = date.toISOString().substring(0, 7);
      const cumulativeData = await CumulativeTime(goalId, month);
      setCumulativeTimeByDate(cumulativeData);
    };

    loadCumulativeTime();
  }, [goalId, date]);

  const calculateDaysRemaining = () => {
    if (!targetDate) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const toggleTask = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    try {
      const task = updatedTasks.find(t => t.id === taskId);
      await axios.put(`${API_BASE_URL}/goals/tasks/${taskId}`, {
        completed: task.completed
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/goals/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setPopupVisible(true);
  };

  const handleAddTaskClick = () => {
    setAddTaskPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedTask(null);
    setEditedTask('');
  };

  const closeAddTaskPopup = () => {
    setAddTaskPopupVisible(false);
    setNewTask('');
  };

  const saveTask = async () => {
    if (!editedTask.trim() || !selectedTask) return;

    try {
      await axios.put(`${API_BASE_URL}/goals/tasks/${selectedTask.id}`, {
        task_name: editedTask
      });

      setTasks(tasks.map(task =>
        task.id === selectedTask.id ? { ...task, task: editedTask } : task
      ));
      closePopup();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(new Date(newDate));
    setTotalTime(0);
    setIsLoaded(false);
  };

  const addTask = async () => {
    if (!newTask.trim() || !goalId) return;

    try {
      const today = date.toISOString().split('T')[0];
      const response = await axios.post(`${API_BASE_URL}/goals/${goalId}/tasks`, {
        task_name: newTask,
        task_date: today,
        completed: false,
        total_time: 0
      });

      setTasks([...tasks, {
        id: response.data.task_id,
        task: newTask,
        completed: false,
        totalTime: 0
      }]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
    setAddTaskPopupVisible(false);
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progressBarWidth = tasks.length > 0 ? (completedTasksCount / tasks.length) * 100 : 0;

  const todayDate = date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>

      <AppNavbar/>
      <GoalSidebar isOpen={isOpen} sidebarHandler={sidebarHandler} />

      <div className={`goal-content ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="goal-center">
          <h1 className="goal-title">Goal</h1>
          
          {/* 목표 제목 & D-day */}
          <div className="goal-header-card">
            <h2 className="goal-goal-title">{goalTitle || "목표 제목을 정해주세요"}</h2>
            <h1 className="goal-d-day">{targetDate ? `D-${calculateDaysRemaining()}` : '목표 날짜를 정해주세요'}</h1>
          </div>

          {/* 타이머 섹션 */}
          <div className="goal_timer-section">
            <Timer
              isRunning={isRunning}
              setIsRunning={setIsRunning}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
              isLoaded={isLoaded}
              goalId={goalId}
              taskId={tasks.length > 0 ? tasks[0].id : null}
              date={date.toISOString().split('T')[0]}
            />
          </div>

          {/* 작업 목록 섹션 */}
          <div className="goal_task-bar">
            <div className="goal_progress-bar-container">
              <div className="goal_progress-bar" style={{ width: `${progressBarWidth}%` }} />
            </div>
            <div className="goal_task-list">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`goal_task-item ${task.completed ? 'completed' : ''}`}
                  onClick={() => handleTaskClick(task)}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                  />
                  <span>{task.task}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    className="goal_delete-button"
                  >
                    삭제
                  </button>
                </div>
              ))}
              <button onClick={handleAddTaskClick} className="goal_add-task-button">
                + 작업 추가
              </button>
            </div>
          </div>

          {/* 캘린더 섹션 */}
          <div className="goal_calendar-section">
            <CalendarComponent
              date={date}
              onDateChange={handleDateChange}
              cumulativeTimeByDate={cumulativeTimeByDate}
            />
          </div>

          {/* 그래프 섹션 */}
          <div className="goal_graph-section">
            <TimeGraph goalId={goalId} />
          </div>
        </div>
      </div>

      {/* 작업 수정 팝업 */}
      {popupVisible && selectedTask && (
        <Popup
          show={popupVisible}
          onClose={closePopup}
          onSave={saveTask}
          task={selectedTask.task}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
      )}

      {/* 작업 추가 팝업 */}
      {addTaskPopupVisible && (
        <Popup
          show={addTaskPopupVisible}
          onClose={closeAddTaskPopup}
          onSave={addTask}
          task={''}
          editedTask={newTask}
          setEditedTask={setNewTask}
        />
      )}
    </div>
  );
};

export default Goal;

