import React, { useEffect, useState } from 'react';
import AppNavbar from "../../../ui/bar/AppNavbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../../style/Page.css';
import '../../../style/Diary.css';

function StarAvg({ userid, date }) {
    const navigate = useNavigate();
    const [averageScore, setAverageScore] = useState({ weekly: 0, monthly: 0 });

    const backHandler = () => {
        navigate(`/diary/${userid}/${date}`);
    };

    // 평균 점수에 따른 멘트 결정
    const getMessage = (score) => {
        if (score >= 4) {
            return "훌륭한 한 주였어요! 계속 이렇게 유지해 보세요!";
        } else if (score >= 3) {
            return "좋은 성과예요! 조금만 더 힘내면 완벽해질 거예요!";
        } else if (score >= 2) {
            return "괜찮아요! 앞으로 더 좋아질 거예요!";
        } else {
            return "지금은 어려울 수 있지만 곧 나아질 거예요!";
        }
    };

    // 별 모양 이모지로 점수 표시
    const renderStars = (score) => {
        const filledStars = '⭐'.repeat(Math.floor(score)); 
        const emptyStars = '☆'.repeat(5 - Math.floor(score)); 
        return filledStars + emptyStars;
    };

    // 일주일 및 한 달 평균 점수 계산
    useEffect(() => {
        async function fetchDiaryScores() {
            try {
                const response = await axios.get(`/api/diary/scores/${userid}`);
                const diaryEntries = response.data;

                const targetDate = new Date(date);
                const weeklyEntries = diaryEntries.filter(entry => {
                    const entryDate = new Date(entry.date);
                    return (targetDate - entryDate) / (1000 * 60 * 60 * 24) <= 7; // 7일 이내
                });
                const monthlyEntries = diaryEntries.filter(entry => {
                    const entryDate = new Date(entry.date);
                    return (targetDate - entryDate) / (1000 * 60 * 60 * 24) <= 30; // 30일 이내
                });

                const weeklyAverage = weeklyEntries.length > 0 
                    ? weeklyEntries.reduce((sum, entry) => sum + entry.score, 0) / weeklyEntries.length
                    : 0;
                const monthlyAverage = monthlyEntries.length > 0 
                    ? monthlyEntries.reduce((sum, entry) => sum + entry.score, 0) / monthlyEntries.length
                    : 0;

                setAverageScore({ weekly: weeklyAverage, monthly: monthlyAverage });
            } catch (error) {
                console.error("점수를 불러오는 중 오류가 발생했습니다:", error);
            }
        }
        fetchDiaryScores();
    }, [userid, date]);

    return (
        <div className="diary-container">
            <AppNavbar />
            <div className="staravg-back" onClick={backHandler}>
                <img src="./img/button/arrow-left.png" alt="되돌아가기" />
            </div>

            <div className="staravg-container">
                <h2 className="staravg-title">My Score</h2>
                
                <div className="diary-padding"/>
                <div className="staravg-center">
                    <div className="border-score">
                        <div className="staravg-line">일주일 별점</div>
                        <div className="star-rating">{renderStars(averageScore.weekly)}</div>
                        <div className="avgscore">{averageScore.weekly.toFixed(1)}</div>
                        <div className="score-message">{getMessage(averageScore.weekly)}</div>
                    </div>

                    <div className="diary-padding"/>

                    <div className="border-score">
                        <div className="staravg-line">한 달 별점</div>
                        <div className="star-rating">{renderStars(averageScore.monthly)}</div>
                        <div className="avgscore">{averageScore.monthly.toFixed(1)}</div>
                        <div className="score-message">{getMessage(averageScore.monthly)}</div>
                    </div>
                </div>
                <div className="staravg-padding-bottom"/>
            </div>
        </div>
    );
}

export default StarAvg;
