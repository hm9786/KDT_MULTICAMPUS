import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavbar from '../../ui/bar/AppNavbar';
import ProfileSidebar from '../../ui/bar/ProfileSidebar';
// import RoutineChart from './RoutineChart';
// import RoutineList from './RoutineList';
// import RoutinePopup from './RoutinePopup';

import RoutineChart from '../mode/routine/RoutineChart';
import RoutineList from '../mode/routine/RoutineList';
import RoutinePopup from '../mode/routine/RoutinePopup';

import '../../style/Routine.css';

function RoutinePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedRoutine, setSelectedRoutine] = useState(null);

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

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleRoutineSelect = (routine) => {
        setSelectedRoutine(routine);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedRoutine(null);
    };

    return (
        <div className="routine-page">
            <AppNavbar />
            <ProfileSidebar isOpen={isOpen} sidebarHandler={handleSidebarToggle} />
            <h2>오늘 나의 루틴</h2>
            <RoutineChart routines={routines} />
            <RoutineList routines={routines} onRoutineSelect={handleRoutineSelect} />
            {popupVisible && selectedRoutine && (
                <RoutinePopup 
                    routine={selectedRoutine} 
                    onClose={closePopup} 
                    onRefresh={fetchRoutines}
                />
            )}
        </div>
    );
}

export default RoutinePage;
