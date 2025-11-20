import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../utils/api';
import '../../style/Goal.css';
import '../../style/GoalCalendar.css';

import axios from 'axios';

import AppNavbar from '../../ui/bar/AppNavbar';
import GoalSidebar from '../../ui/bar/GoalSidebar';

import Popup from '../mode/goal/Popup';
import Timer from '../mode/goal/Timer';
import CalendarComponent from '../mode/goal/CalendarComponent';
import TimeGraph from '../mode/goal/TimeGraph';


import {
  GoalData,
  totalTimeFromDB,
  TasksForDate,
  CumulativeTime,
  saveTotalTimeToDB,
} from '../mode/goal/api';

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
      try {
        const goalData = await GoalData(userId);
        setGoalId(goalData.goalId);
        setGoalTitle(goalData.goalTitle);
        setTargetDate(goalData.targetDate);
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };

    loadGoalData();
  }, [userId]);

  // 선택된 날짜의 할 일 로드
  useEffect(() => {
    const loadTasksForSelectedDate = async () => {
      if (!goalId) return;
      const selectedDate = date.toISOString().split('T')[0];
      try {
        const tasksForDate = await TasksForDate(goalId, selectedDate);
        setTasks(tasksForDate);
      } catch (error) {
        console.error('Error fetching tasks for selected date:', error);
      }
    };

    loadTasksForSelectedDate();
  }, [date, goalId]);

  // 해당 달의 누적 시간 가져오기
  useEffect(() => {
    const loadCumulativeTime = async () => {
      if (!goalId) return;
      const month = date.toISOString().slice(0, 7);
      try {
        const cumulativeTime = await CumulativeTime(goalId, month);
        setCumulativeTimeByDate(cumulativeTime);
      } catch (error) {
        console.error('Error fetching cumulative time:', error);
      }
    };

    loadCumulativeTime();
  }, [date, goalId]);

  // D-day 계산 함수
  const calculateDaysRemaining = () => {
    const today = new Date();
    if (targetDate) {
      const differenceInTime = new Date(targetDate) - today;
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays;
    }
    return null;
  };

  // DB에서 마지막 저장된 totalTime 불러오기
  useEffect(() => {
    const loadTotalTime = async () => {
      if (!goalId) return;
      const selectedDate = date.toISOString().split('T')[0];
      try {
        const savedTime = await totalTimeFromDB(goalId, selectedDate);
        setTotalTime(savedTime);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching total time:', error);
      }
    };

    loadTotalTime();
  }, [date, goalId]);

  const handleButtonClick = (index) => {
    setSelectedTask(index);
    setEditedTask(tasks[index].task);
    setPopupVisible(true);
  };

  const handleCheckboxChange = async (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
    // Spring Boot API에 업데이트
    if (goalId && tasks[index].id) {
      try {
        const selectedDate = date.toISOString().split('T')[0];
        await axios.put(`${API_BASE_URL}/goals/tasks/${tasks[index].id}`, {
          completed: !tasks[index].completed,
          task_date: selectedDate
        });
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

 
  const handleTaskEdit = async () => {
    if (!goalId || selectedTask === null) return;
    const selectedDate = date.toISOString().split('T')[0];
    try {
      await axios.put(`${API_BASE_URL}/goals/tasks/${tasks[selectedTask].id}`, {
        task_name: editedTask,
        task_date: selectedDate
      });
      const updatedTasks = tasks.map((task, i) =>
        i === selectedTask ? { ...task, task: editedTask } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setPopupVisible(false);
    setSelectedTask(null);
  };

  const handleTaskDelete = async () => {
    if (!goalId || selectedTask === null) return;
    try {
      await axios.delete(`${API_BASE_URL}/goals/tasks/${tasks[selectedTask].id}`);
      const updatedTasks = tasks.filter((_, i) => i !== selectedTask);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setPopupVisible(false);
    setSelectedTask(null);
  };

  const handleAddTask = async () => {
    if (!goalId || newTask.trim() === '') return;
    const selectedDate = date.toISOString().split('T')[0];
    try {
      const response = await axios.post(`${API_BASE_URL}/goals/${goalId}/tasks`, {
        task_name: newTask,
        task_date: selectedDate,
        completed: false,
        total_time: 0
      });
      setTasks([...tasks, {
        id: response.data.task_id,
        task: response.data.task_name,
        completed: response.data.completed,
        totalTime: response.data.total_time
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
          
          {/* 목표 제목 및 D-day */}
          <div className="goal-header-card">
            <h2 className="goal-goal-title">{goalTitle || "목표 제목을 설정해주세요"}</h2>
            <h1 className="goal-d-day">{targetDate ? `D-${calculateDaysRemaining()}` : '목표 날짜를 설정해주세요'}</h1>
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
              <div className="goal_task-header">
                <h3>{todayDate} 할 일</h3>
                <button className="goal_button add-task-button" onClick={() => setAddTaskPopupVisible(true)}>+</button>
              </div>
              {/* 미완료 작업 먼저 표시 */}
              {tasks.filter(task => !task.completed).map((task) => {
                const originalIndex = tasks.findIndex(t => t.id === task.id);
                return (
                  <div className="goal_task-item" key={task.id || originalIndex}>
                    <input type="checkbox" className="goal_checkbox" checked={task.completed} onChange={() => handleCheckboxChange(originalIndex)} />
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.task}
                    </span>
                    <button className="goal_action-button" onClick={() => handleButtonClick(originalIndex)}>
                      -
                    </button>
                  </div>
                );
              })}
              {/* 완료된 작업 나중에 표시 */}
              {tasks.filter(task => task.completed).map((task) => {
                const originalIndex = tasks.findIndex(t => t.id === task.id);
                return (
                  <div className="goal_task-item completed-task" key={task.id || originalIndex}>
                    <input type="checkbox" className="goal_checkbox" checked={task.completed} onChange={() => handleCheckboxChange(originalIndex)} />
                    <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
                      {task.task}
                    </span>
                    <button className="goal_action-button" onClick={() => handleButtonClick(originalIndex)}>
                      -
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      <Popup
        isVisible={popupVisible}
        taskValue={editedTask}
        onTaskChange={setEditedTask}
        onSave={handleTaskEdit}
        onDelete={handleTaskDelete}
        onClose={() => setPopupVisible(false)}
        isAddTask={false}
      />

      <Popup
        isVisible={addTaskPopupVisible}
        taskValue={newTask}
        onTaskChange={setNewTask}
        onSave={handleAddTask}
        onClose={() => setAddTaskPopupVisible(false)}
        isAddTask={true}
      />

        {/* 캘린더 섹션 */}
        <div className="goal-calendar-wrapper">
          <CalendarComponent
            date={date}
            setDate={setDate}
            cumulativeTimeByDate={cumulativeTimeByDate}
          />
        </div>

        {/* 그래프 섹션 */}
        {goalId && (
          <TimeGraph goalId={goalId} userId={userId} />
        )}

        <div className="goal-padding-bottom"></div>
      </div>
    </div>
  );
};

export default Goal;