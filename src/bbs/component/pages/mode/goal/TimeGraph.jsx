import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';
import '../../style/Goal.css';

function TimeGraph({ goalId, userId }) {
    const [graphType, setGraphType] = useState('weekly');
    const [weeklyData, setWeeklyData] = useState(null);
    const [monthlyData, setMonthlyData] = useState(null);

    useEffect(() => {
        if (goalId) {
            fetchGraphData();
        }
    }, [goalId, graphType]);

    const fetchGraphData = async () => {
        try {
            if (graphType === 'weekly') {
                // 이번 주 데이터
                const today = new Date();
                const dayOfWeek = today.getDay();
                const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
                const weekStart = new Date(today.setDate(diff));
                
                const tasksResponse = await axios.get(`${API_BASE_URL}/goals/${goalId}/tasks`);
                const tasks = tasksResponse.data || [];
                
                const weeklyTime = {};
                for (let i = 0; i < 7; i++) {
                    const date = new Date(weekStart);
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    
                    const dayTasks = tasks.filter(t => t.task_date === dateStr);
                    weeklyTime[dateStr] = dayTasks.reduce((sum, t) => sum + (t.total_time || 0), 0);
                }
                
                setWeeklyData(weeklyTime);
            } else {
                // 이번 달 데이터
                const today = new Date();
                const month = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
                
                const response = await axios.get(`${API_BASE_URL}/goals/${goalId}/total-time?month=${month}`);
                const tasksResponse = await axios.get(`${API_BASE_URL}/goals/${goalId}/tasks`);
                const tasks = tasksResponse.data || [];
                
                const monthlyTime = {};
                tasks.forEach(task => {
                    const taskMonth = task.task_date.substring(0, 7);
                    if (taskMonth === month) {
                        const date = task.task_date;
                        monthlyTime[date] = (monthlyTime[date] || 0) + (task.total_time || 0);
                    }
                });
                
                setMonthlyData(monthlyTime);
            }
        } catch (error) {
            console.error('그래프 데이터를 가져오는 중 오류:', error);
        }
    };

    const formatChartData = (data) => {
        if (!data) return null;

        const labels = Object.keys(data).sort().map(date => {
            const d = new Date(date);
            return graphType === 'weekly' 
                ? `${d.getMonth() + 1}/${d.getDate()}`
                : `${d.getDate()}일`;
        });
        
        const values = Object.keys(data).sort().map(date => {
            const minutes = data[date] || 0;
            return Math.round(minutes / 60 * 10) / 10; // 분을 시간으로 변환
        });

        return {
            labels,
            datasets: [{
                label: '소요 시간 (시간)',
                data: values,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        };
    };

    const chartData = graphType === 'weekly' 
        ? formatChartData(weeklyData)
        : formatChartData(monthlyData);

    return (
        <div className="goal-time-graph-container">
            <div className="goal-graph-header">
                <h3>시간 소요 그래프</h3>
                <div className="goal-graph-period">
                    <button
                        className={graphType === 'weekly' ? 'active' : ''}
                        onClick={() => setGraphType('weekly')}
                    >
                        주간
                    </button>
                    <button
                        className={graphType === 'monthly' ? 'active' : ''}
                        onClick={() => setGraphType('monthly')}
                    >
                        월간
                    </button>
                </div>
            </div>

            {chartData && (
                <div className="goal-graph-content">
                    <Line 
                        data={chartData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    title: {
                                        display: true,
                                        text: '시간 (시간)'
                                    }
                                }
                            }
                        }} 
                    />
                </div>
            )}
        </div>
    );
}

export default TimeGraph;

