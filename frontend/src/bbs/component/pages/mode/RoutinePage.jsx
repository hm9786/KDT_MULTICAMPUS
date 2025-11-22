import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';
import AppNavbar from '../../ui/bar/AppNavbar';
import ProfileSidebar from '../../ui/bar/ProfileSidebar';
// import RoutineChart from './RoutineChart';
// import RoutineList from './RoutineList';
// import RoutinePopup from './RoutinePopup';

import RoutineChart from '../mode/routine/RoutineChart';
import RoutineList from '../mode/routine/RoutineList.jsx';
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
            const userId = parseInt(localStorage.getItem('userId') || '0');
            const response = await axios.get(`${API_BASE_URL}/routines/user/${userId}`);
            setRoutines(response.data);
        } catch (error) {
            console.error('루틴 ?�이?��? 가?�오??�??�류 발생:', error);
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
            <h2>?�늘 ?�의 루틴</h2>
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
