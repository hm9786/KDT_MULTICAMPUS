import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ChartComponent from './routine/ChartComponent';
import RoutineList from './routine/RoutineList';
import Popup from './routine/Popup';

import RoutineSidebar from '../../ui/bar/RoutineSidebar';

import '../../style/Routine.css';
import AppNavbar from '../../ui/bar/AppNavbar';
import HomeButton from '../../ui/button/HomeButton';

function Routine() {

  const [isOpen, setIsOpen] = useState(false);

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
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get('/api/routines');
      setRoutines(response.data);
    } catch (error) {
      console.error('루틴 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const toggleComplete = async (routine) => {
    const updatedRoutine = { ...routine, completed: !routine.completed };
    try {
      await axios.put(`/api/routines/${routine.id}`, updatedRoutine);
      setRoutines(routines.map((r) => (r.id === routine.id ? updatedRoutine : r)));
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
    const newRoutine = {
      task: newTask,
      time: newTime,
      completed: false,
    };
    try {
      const response = await axios.post('/api/routines', newRoutine);
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
    const updatedRoutine = { ...selectedRoutine, task: newTask };
    try {
      await axios.put(`/api/routines/${selectedRoutine.id}`, updatedRoutine);
      setRoutines(routines.map((r) => (r.id === selectedRoutine.id ? updatedRoutine : r)));
      closePopup();
    } catch (error) {
      console.error('루틴 작업 업데이트 중 오류 발생:', error);
    }
  };

  const saveTime = async () => {
    if (!selectedRoutine) return;
    const updatedRoutine = { ...selectedRoutine, time: newTime };
    try {
      await axios.put(`/api/routines/${selectedRoutine.id}`, updatedRoutine);
      setRoutines(routines.map((r) => (r.id === selectedRoutine.id ? updatedRoutine : r)));
      closePopup();
    } catch (error) {
      console.error('루틴 시간 업데이트 중 오류 발생:', error);
    }
  };

  const startEditingTask = () => {
    setEditingTask(true);
    setNewTask(selectedRoutine.task);
  };

  const startEditingTime = () => {
    setEditingTime(true);
    setNewTime(selectedRoutine.time);
  };

  const handleDelete = async () => {
    if (!selectedRoutine) return;
    try {
      await axios.delete(`/api/routines/${selectedRoutine.id}`);
      setRoutines(routines.filter((r) => r.id !== selectedRoutine.id));
      closePopup();
    } catch (error) {
      console.error('루틴 삭제 중 오류 발생:', error);
    }
  };

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