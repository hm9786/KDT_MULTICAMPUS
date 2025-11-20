import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../../utils/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';
import '../../style/Routine.css';

function RoutineStats({ userId }) {
    const [weeklyStats, setWeeklyStats] = useState(null);
    const [monthlyStats, setMonthlyStats] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('weekly');

    useEffect(() => {
        if (userId) {
            fetchStats();
        }
    }, [userId, selectedPeriod]);

    const fetchStats = async () => {
        try {
            const today = new Date();
            let startDate;

            if (selectedPeriod === 'weekly') {
                // 이번 주 월요일
                const dayOfWeek = today.getDay();
                const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
                startDate = new Date(today.setDate(diff));
                startDate.setHours(0, 0, 0, 0);

                const response = await axios.get(
                    `${API_BASE_URL}/routines/stats/user/${userId}/weekly?startDate=${startDate.toISOString().split('T')[0]}`
                );
                setWeeklyStats(response.data);
            } else {
                // 이번 달 1일
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);

                const response = await axios.get(
                    `${API_BASE_URL}/routines/stats/user/${userId}/monthly?startDate=${startDate.toISOString().split('T')[0]}`
                );
                setMonthlyStats(response.data);
            }
        } catch (error) {
            console.error('통계를 가져오는 중 오류:', error);
        }
    };

    const stats = selectedPeriod === 'weekly' ? weeklyStats : monthlyStats;

    const chartData = stats ? {
        labels: ['완료율'],
        datasets: [{
            label: '달성률 (%)',
            data: [stats.completionRate || 0],
            backgroundColor: '#F4CFC7',
            borderColor: '#C57D75',
            borderWidth: 2
        }]
    } : null;

    return (
        <div className="routine-stats-container">
            <div className="routine-stats-header">
                <h3>루틴 통계</h3>
                <div className="routine-stats-period">
                    <button
                        className={selectedPeriod === 'weekly' ? 'active' : ''}
                        onClick={() => setSelectedPeriod('weekly')}
                    >
                        주간
                    </button>
                    <button
                        className={selectedPeriod === 'monthly' ? 'active' : ''}
                        onClick={() => setSelectedPeriod('monthly')}
                    >
                        월간
                    </button>
                </div>
            </div>

            {stats && (
                <div className="routine-stats-content">
                    <div className="routine-stats-info">
                        <div className="stat-item">
                            <span className="stat-label">완료된 루틴:</span>
                            <span className="stat-value">{stats.totalCompleted}개</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">활동한 날:</span>
                            <span className="stat-value">{stats.totalDays}일</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">달성률:</span>
                            <span className="stat-value">{stats.completionRate}%</span>
                        </div>
                    </div>

                    {chartData && (
                        <div className="routine-stats-chart">
                            <Bar data={chartData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100
                                    }
                                }
                            }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default RoutineStats;
