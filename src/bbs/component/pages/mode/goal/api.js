import axios from 'axios';

// 총 시간을 데이터베이스에 저장하는 함수
export const saveTotalTimeToDB = async (totalTime) => {
    try {
        await axios.post('/api/save-time', { totalTime });
        return true;
    } catch (error) {
        console.error('Error saving total time:', error);
        return false;
    }
};

// 목표와 작업을 서버에서 가져오는 함수 (axios 사용)
export const GoalData = async () => {
    try {
        const response = await axios.get('/api/goal'); // 서버 엔드포인트
        return response.data; // 응답 데이터 반환 (예: { goalTitle, targetDate })
    } catch (error) {
        console.error('Error fetching goal data:', error);
        throw error; // 오류가 발생하면 예외를 던짐
    }
};

// DB에서 totalTime 가져오기 (axios 사용)
export const totalTimeFromDB = async () => {
    try {
        const response = await axios.get('/api/getTotalTime'); // 서버 API 호출
        return response.data.totalTime || 0; // totalTime을 반환
    } catch (error) {
        console.error('Error fetching total time from DB:', error);
        return 0; // 에러 발생 시 0 반환
    }
};

// 날짜를 서버에서 가져오는 함수
export const TasksForDate = async (date) => {
    try {
        const response = await axios.get(`/api/tasks/${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks for selected date:', error);
        throw error;
    }
};

export const CumulativeTime = async (month) => {
    try {
        const response = await axios.get(`/api/cumulative-time/${month}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cumulative time:', error);
        throw error;
    }
};

// // 비동기 통신
// export const updateTask = async (taskId, taskData) => {
//     try {
//         await axios.put(`/api/tasks/${taskId}`, taskData);
//     } catch (error) {
//         console.error('Error updating task:', error);
//         throw error;
//     }
// };

// export const deleteTask = async (taskId) => {
//     try {
//         await axios.delete(`/api/tasks/${taskId}`);
//     } catch (error) {
//         console.error('Error deleting task:', error);
//         throw error;
//     }
// };

// export const addTask = async (taskData) => {
//     try {
//         const response = await axios.post('/api/tasks', taskData);
//         return response.data;
//     } catch (error) {
//         console.error('Error adding task:', error);
//         throw error;
//     }
// };