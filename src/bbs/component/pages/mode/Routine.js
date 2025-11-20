import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../utils/api';

import ChartComponent from './routine/ChartComponent';
import RoutineList from './routine/RoutineList';
import Popup from './routine/Popup';
import RoutineStats from './routine/RoutineStats';

import RoutineSidebar from '../../ui/bar/RoutineSidebar';

import '../../style/Routine.css';
import AppNavbar from '../../ui/bar/AppNavbar';
import HomeButton from '../../ui/button/HomeButton';

function Routine() {

  const [isOpen, setIsOpen] = useState(false);
  const userId = parseInt(localStorage.getItem('userId') || '0');

  const [routines, setRoutines] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [EditingTask, setEditingTask] = useState(false);
  const [EditingTime, setEditingTime] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState(new Date());

    // 사이드바 핸들러
  const sidebarHandler = () => {
      setIsOpen(!isOpen);
  };


  useEffect(() => {
    if (userId) {
      fetchRoutines();
    }
    // 알림 권한 요청
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [userId]);

  // 루틴 시간 알림
  useEffect(() => {
    const scheduleRoutineNotifications = () => {
      routines.forEach(routine => {
        if (routine.time && routine.is_active) {
          const [hours, minutes] = routine.time.split(':');
          const now = new Date();
          const routineTime = new Date();
          routineTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          
          // 오늘의 루틴 시간이 지나지 않았으면 알림 설정
          if (routineTime > now) {
            const delay = routineTime.getTime() - now.getTime();
            setTimeout(() => {
              if (Notification.permission === 'granted') {
                new Notification('루틴 알림', {
                  body: `${routine.title} 시간입니다!`,
                  icon: '/logo192.png'
                });
              }
            }, delay);
          }
        }
      });
    };
    
    scheduleRoutineNotifications();
  }, [routines]);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/routines/user/${userId}`);
      setRoutines(response.data);
    } catch (error) {
      console.error('루틴 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const toggleComplete = async (routine) => {
    const today = new Date().toISOString().split('T')[0];
    const logData = {
      routine_id: routine.routine_id,
      user_UN: userId,
      log_date: today,
      completed: !routine.completed,
      value: routine.current_value || 0
    };
    try {
      await axios.post(`${API_BASE_URL}/routines/logs`, logData);
      // 로컬 상태 업데이트
      setRoutines(routines.map((r) => (r.routine_id === routine.routine_id ? { ...r, completed: !r.completed } : r)));
    } catch (error) {
      console.error('루틴 완료 상태 업데이트 중 오류 발생:', error);
    }
  };

  const handleButtonClick = (routine) => {
    setSelectedRoutine(routine);
    setPopupVisible(true);
    setEditingTask(false);
    setEditingTime(false);
  };

  const handleAddRoutine = async () => {
    if (!newTask) return;
    const timeStr = newTime instanceof Date ? newTime.toTimeString().slice(0, 5) : newTime;
    const newRoutine = {
      user_UN: userId,
      title: newTask,
      description: '',
      time: timeStr,
      repeat_days: '',
      repeat_type: 'daily',
      routine_type: 'custom',
      target_value: null,
      current_value: 0,
      is_active: true
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/routines`, newRoutine);
      setRoutines([...routines, response.data]);
      setNewTask('');
      setNewTime(new Date());
    } catch (error) {
      console.error('루틴 추가 중 오류 발생:', error);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedRoutine(null);
    setNewTask('');
    setNewTime(new Date());
    setEditingTask(false);
    setEditingTime(false);
  };

  const saveTask = async () => {
    if (!newTask || !selectedRoutine) return;
    const updatedRoutine = { ...selectedRoutine, title: newTask };
    try {
      await axios.put(`${API_BASE_URL}/routines/${selectedRoutine.routine_id}`, updatedRoutine);
      setRoutines(routines.map((r) => (r.routine_id === selectedRoutine.routine_id ? updatedRoutine : r)));
      closePopup();
    } catch (error) {
      console.error('루틴 작업 업데이트 중 오류 발생:', error);
    }
  };

  const saveTime = async () => {
    if (!selectedRoutine) return;
    const timeStr = newTime instanceof Date ? newTime.toTimeString().slice(0, 5) : newTime;
    const updatedRoutine = { ...selectedRoutine, time: timeStr };
    try {
      await axios.put(`${API_BASE_URL}/routines/${selectedRoutine.routine_id}`, updatedRoutine);
      setRoutines(routines.map((r) => (r.routine_id === selectedRoutine.routine_id ? updatedRoutine : r)));
      closePopup();
    } catch (error) {
      console.error('루틴 시간 업데이트 중 오류 발생:', error);
    }
  };

  const startEditingTask = () => {
    setEditingTask(true);
    setNewTask(selectedRoutine.title || selectedRoutine.task);
  };

  const startEditingTime = () => {
    setEditingTime(true);
    setNewTime(selectedRoutine.time || new Date());
  };

  const handleDelete = async () => {
    if (!selectedRoutine) return;
    try {
      await axios.delete(`${API_BASE_URL}/routines/${selectedRoutine.routine_id}`);
      setRoutines(routines.filter((r) => r.routine_id !== selectedRoutine.routine_id));
      closePopup();
    } catch (error) {
      console.error('루틴 삭제 중 오류 발생:', error);
    }
  };

  // 오늘 날짜의 루틴 로그 가져오기
  useEffect(() => {
    const fetchTodayLogs = async () => {
      if (userId && routines.length > 0) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const response = await axios.get(`${API_BASE_URL}/routines/user/${userId}/logs?log_date=${today}`);
          const logs = response.data;
          // 루틴에 완료 상태 업데이트
          setRoutines(routines.map(routine => {
            const log = logs.find(l => l.routine_id === routine.routine_id);
            return log ? { ...routine, completed: log.completed } : routine;
          }));
        } catch (error) {
          console.error('오늘의 루틴 로그를 가져오는 중 오류 발생:', error);
        }
      }
    };
    fetchTodayLogs();
  }, [routines.length, userId]);

  const completedCount = routines.filter((r) => r.completed).length;
  const totalRoutines = routines.length;

  return (
    <div className="routine-page">
      
      <AppNavbar/>
      <RoutineSidebar
        isOpen={isOpen} 
        sidebarHandler={sidebarHandler}
      />

      <div className={`diary-content ${isOpen ? 'sidebar-open' : ''}`}>

        <h2 className='routine-title'>Today Routine</h2>
        <ChartComponent completedCount={completedCount} 
                        totalRoutines={totalRoutines} 
        />
        <RoutineList routines={routines} 
                    toggleComplete={toggleComplete} 
                    handleButtonClick={handleButtonClick} 
        />
        <HomeButton className="add-button" 
                onClick={handleAddRoutine}
                title="add routine"
        />

        <RoutineStats userId={userId} />

        <Popup
          popupVisible={popupVisible}
          selectedRoutine={selectedRoutine}
          closePopup={closePopup}
          EditingTask={EditingTask}
          EditingTime={EditingTime}
          newTask={newTask}
          newTime={newTime}
          handleTaskChange={(e) => setNewTask(e.target.value)}
          saveTask={saveTask}
          saveTime={saveTime}
          startEditingTask={startEditingTask}
          startEditingTime={startEditingTime}
          handleDelete={handleDelete}
        />

        <div className='routine-padding-bottom'></div>

      </div>



    </div>
  );
}

export default Routine;