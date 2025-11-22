import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';

import ChartComponent from './routine/ChartComponent.jsx';
import RoutineList from './routine/RoutineList.jsx';
import Popup from './routine/Popup.jsx';
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

  // 루틴 데이터를 가져오는 함수
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/routines/user/${userId}`);
        // 오늘 날짜의 루틴만 필터링
        const today = new Date().toISOString().split('T')[0];
        const todayRoutines = response.data.filter(routine => routine.routine_date === today);
        setRoutines(todayRoutines);
      } catch (error) {
        console.error('루틴 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    fetchRoutines();
  }, [userId]);

  // 루틴 완료 토글 함수
  const toggleComplete = async (routineId) => {
    try {
      const routine = routines.find(r => r.routine_id === routineId);
      const updatedRoutines = routines.map(r =>
        r.routine_id === routineId ? { ...r, completed: !r.completed } : r
      );
      setRoutines(updatedRoutines);

      await axios.put(`${API_BASE_URL}/routines/${routineId}`, {
        completed: !routine.completed
      });
    } catch (error) {
      console.error('루틴 완료 상태 변경 중 오류 발생:', error);
    }
  };

  // 버튼 클릭 핸들러 (팝업 열기)
  const handleButtonClick = (routine) => {
    setSelectedRoutine(routine);
    setPopupVisible(true);
    setEditingTask(false);
    setEditingTime(false);
  };

  // 루틴 추가 버튼 클릭 핸들러
  const handleAddRoutine = () => {
    setSelectedRoutine(null);
    setPopupVisible(true);
    setEditingTask(false);
    setEditingTime(false);
    setNewTask('');
    setNewTime(new Date());
  };

  // 팝업 닫기 핸들러
  const closePopup = () => {
    setPopupVisible(false);
    setSelectedRoutine(null);
    setEditingTask(false);
    setEditingTime(false);
  };

  // 작업 편집 시작
  const startEditingTask = () => {
    setEditingTask(true);
    if (selectedRoutine) {
      setNewTask(selectedRoutine.task);
    }
  };

  // 시간 편집 시작
  const startEditingTime = () => {
    setEditingTime(true);
    if (selectedRoutine) {
      setNewTime(new Date(selectedRoutine.routine_time));
    }
  };

  // 작업 저장
  const saveTask = async () => {
    if (!newTask.trim()) return;

    if (selectedRoutine) {
      // 기존 루틴 수정
      try {
        await axios.put(`${API_BASE_URL}/routines/${selectedRoutine.routine_id}`, {
          task: newTask
        });
        setRoutines(routines.map(r =>
          r.routine_id === selectedRoutine.routine_id ? { ...r, task: newTask } : r
        ));
        setEditingTask(false);
      } catch (error) {
        console.error('작업 저장 중 오류 발생:', error);
      }
    } else {
      // 새 루틴 추가
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.post(`${API_BASE_URL}/routines`, {
          user_UN: userId,
          task: newTask,
          routine_date: today,
          routine_time: newTime.toISOString(),
          completed: false
        });
        setRoutines([...routines, response.data]);
        setNewTask('');
        closePopup();
      } catch (error) {
        console.error('루틴 추가 중 오류 발생:', error);
      }
    }
  };

  // 시간 저장
  const saveTime = async () => {
    if (!selectedRoutine) return;

    try {
      await axios.put(`${API_BASE_URL}/routines/${selectedRoutine.routine_id}`, {
        routine_time: newTime.toISOString()
      });
      setRoutines(routines.map(r =>
        r.routine_id === selectedRoutine.routine_id ? { ...r, routine_time: newTime.toISOString() } : r
      ));
      setEditingTime(false);
    } catch (error) {
      console.error('시간 저장 중 오류 발생:', error);
    }
  };

  // 오늘 날짜의 루틴 로그 가져오기
  useEffect(() => {
    const fetchTodayLogs = async () => {
      if (routines.length > 0) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const response = await axios.get(`${API_BASE_URL}/routine-logs/user/${userId}/date/${today}`);
          // 필요한 경우 로그 데이터 처리
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
        />
      </div>
    </div>
  );
}

export default Routine;

