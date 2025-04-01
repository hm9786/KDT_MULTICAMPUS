import React, { useState, useEffect } from 'react';

import '../../style/Goal.css';
import '../../style/GoalCalendar.css';

import axios from 'axios';

import AppNavbar from '../../ui/bar/AppNavbar';
import GoalSidebar from '../../ui/bar/GoalSidebar';

import Popup from '../mode/goal/Popup';
import Timer from '../mode/goal/Timer';
import CalendarComponent from '../mode/goal/CalendarComponent';


import {
  GoalData,
  totalTimeFromDB,
  TasksForDate,
  CumulativeTime,
} from '../mode/goal/api';

const Goal = () => {
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
      try {
        const goalData = await GoalData(); // API로부터 데이터 가져오기
        setGoalTitle(goalData.goalTitle); // goalTitle 업데이트
        setTargetDate(goalData.targetDate); // targetDate 업데이트
      } catch (error) {
        console.error('Error fetching goal data:', error);
      }
    };

    loadGoalData(); // 데이터 로딩 함수 호출
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  // 선택된 날짜의 할 일 로드
  useEffect(() => {
    const loadTasksForSelectedDate = async () => {
      const selectedDate = date.toISOString().split('T')[0]; // 선택된 날짜를 'YYYY-MM-DD' 형식으로 변환
      try {
        const tasksForDate = await TasksForDate(selectedDate); // 응답 데이터
        setTasks(tasksForDate);
      } catch (error) {
        console.error('Error fetching tasks for selected date:', error);
      }
    };

    loadTasksForSelectedDate();
  }, [date]);

  // 해당 달의 누적 시간 가져오기
  useEffect(() => {
    const loadCumulativeTime = async () => {
      const month = date.toISOString().slice(0, 7);
      try {
        const cumulativeTime = await CumulativeTime(month); // 응답 데이터
        setCumulativeTimeByDate(cumulativeTime);
      } catch (error) {
        console.error('Error fetching cumulative time:', error);
      }
    };

    loadCumulativeTime();
  }, [date]);

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
      try {
        const savedTime = await totalTimeFromDB(); // DB에서 마지막 totalTime 가져오기
        setTotalTime(savedTime); // 불러온 시간 설정
        setIsLoaded(true); // 데이터 로딩 완료
      } catch (error) {
        console.error('Error fetching total time:', error);
      }
    };

    loadTotalTime();
  }, []);

  const handleButtonClick = (index) => {
    setSelectedTask(index);
    setEditedTask(tasks[index].task);
    setPopupVisible(true);
  };

  const handleCheckboxChange = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

 
  const handleTaskEdit = async () => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === selectedTask) {
        return { ...task, task: editedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
    try {
      await axios.put(`/api/tasks/${tasks[selectedTask].id}`, { task: editedTask }); // PUT 요청
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setPopupVisible(false);
    setSelectedTask(null);
  };

  const handleTaskDelete = async () => {
    const updatedTasks = tasks.filter((_, i) => i !== selectedTask);
    setTasks(updatedTasks);
    try {
      await axios.delete(`/api/tasks/${tasks[selectedTask].id}`); // DELETE 요청
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setPopupVisible(false);
    setSelectedTask(null);
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { task: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
      try {
        const response = await axios.post('/api/tasks', { task: newTask }); // POST 요청
        setTasks((prevTasks) => [...prevTasks, response.data]);
      } catch (error) {
        console.error('Error adding task:', error);
      }
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
      <div className="goal_timer-section">
        <h2>{goalTitle || "목표 제목..."}</h2>
        <h1>{targetDate ? `D-${calculateDaysRemaining()}` : '목표 날짜...'}</h1>
        <Timer
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
          isLoaded={isLoaded}
        />
      </div>

      <div className="goal_task-bar">
        <div className="goal_progress-bar-container">
          <div className="goal_progress-bar" style={{ width: `${progressBarWidth}%` }} />
        </div>

        <div className="goal_task-list">
          <div className="goal_task-header">
            <h3>{todayDate} 할 일</h3>
            <button className="goal_button add-task-button" onClick={() => setAddTaskPopupVisible(true)}>+</button>
          </div>
          {tasks.map((task, index) => (
            <div className="goal_task-item" key={index}>
              <input type="checkbox" className="goal_checkbox" checked={task.completed} onChange={() => handleCheckboxChange(index)} />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.task}
              </span>
              <button className="goal_action-button" onClick={() => handleButtonClick(index)}>
                -
              </button>
            </div>
          ))}
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

      <CalendarComponent
        date={date}
        setDate={setDate}
        cumulativeTimeByDate={cumulativeTimeByDate}
      />
      </div>
    </div>
  );
};

export default Goal;