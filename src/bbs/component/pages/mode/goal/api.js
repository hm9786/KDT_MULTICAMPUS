import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';

// 총 시간을 데이터베이스에 저장하는 함수
export const saveTotalTimeToDB = async (goalId, taskId, totalTime) => {
    try {
        await axios.put(`${API_BASE_URL}/goals/tasks/${taskId}`, { total_time: totalTime });
        return true;
    } catch (error) {
        console.error('Error saving total time:', error);
        return false;
    }
};

// 목표와 작업을 서버에서 가져오는 함수
export const GoalData = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/goals/user/${userId}`);
        if (response.data && response.data.length > 0) {
            const goal = response.data[0];
            return {
                goalId: goal.goal_id,
                goalTitle: goal.title,
                targetDate: goal.target_date
            };
        }
        return { goalId: null, goalTitle: '', targetDate: null };
    } catch (error) {
        console.error('Error fetching goal data:', error);
        return { goalId: null, goalTitle: '', targetDate: null };
    }
};

// DB에서 totalTime 가져오기
export const totalTimeFromDB = async (goalId, date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/goals/${goalId}/tasks/date?task_date=${date}`);
        if (response.data && response.data.length > 0) {
            return response.data.reduce((sum, task) => sum + (task.total_time || 0), 0);
        }
        return 0;
    } catch (error) {
        console.error('Error fetching total time from DB:', error);
        return 0;
    }
};

// 날짜를 서버에서 가져오는 함수
export const TasksForDate = async (goalId, date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/goals/${goalId}/tasks/date?task_date=${date}`);
        return response.data.map(task => ({
            id: task.task_id,
            task: task.task_name,
            completed: task.completed,
            totalTime: task.total_time || 0
        }));
    } catch (error) {
        console.error('Error fetching tasks for selected date:', error);
        return [];
    }
};

export const CumulativeTime = async (goalId, month) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/goals/${goalId}/total-time?month=${month}`);
        const totalTime = response.data.totalTime || 0;
        
        // 해당 월의 모든 작업을 가져와서 날짜별로 그룹화
        const tasksResponse = await axios.get(`${API_BASE_URL}/goals/${goalId}/tasks`);
        const tasks = tasksResponse.data || [];
        
        const timeByDate = {};
        tasks.forEach(task => {
            const taskMonth = task.task_date.substring(0, 7);
            if (taskMonth === month) {
                const date = task.task_date;
                timeByDate[date] = (timeByDate[date] || 0) + (task.total_time || 0);
            }
        });
        
        return timeByDate;
    } catch (error) {
        console.error('Error fetching cumulative time:', error);
        return {};
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