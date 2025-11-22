import React, { useEffect, useState } from 'react';
import AppNavbar from "../../../ui/bar/AppNavbar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../../../../../utils/api';
import '../../../style/Page.css';
import '../../../style/Diary.css';

function StarAvg({ userid, date }) {
    const navigate = useNavigate();
    const [averageScore, setAverageScore] = useState({ weekly: 0, monthly: 0 });

    const backHandler = () => {
        navigate(`/diary/${userid}/${date}`);
    };

    // ?�균 ?�수???�른 멘트 결정
    const getMessage = (score) => {
        if (score >= 4) {
            return "?��?????주�??�요! 계속 ?�렇�??��???보세??";
        } else if (score >= 3) {
            return "좋�? ?�과?�요! 조금�????�내�??�벽?�질 거예??";
        } else if (score >= 2) {
            return "괜찮?�요! ?�으�???좋아�?거예??";
        } else {
            return "지금�? ?�려?????��?�?�??�아�?거예??";
        }
    };

    // �?모양 ?�모지�??�수 ?�시
    const renderStars = (score) => {
        const filledStars = '�?.repeat(Math.floor(score)); 
        const emptyStars = '??.repeat(5 - Math.floor(score)); 
        return filledStars + emptyStars;
    };

    // ?�주??�??????�균 ?�수 계산
    useEffect(() => {
        async function fetchDiaryScores() {
            try {
                const targetDateObj = new Date(date);
                const weekAgo = new Date(targetDateObj);
                weekAgo.setDate(weekAgo.getDate() - 6);
                const monthAgo = new Date(targetDateObj);
                monthAgo.setMonth(monthAgo.getMonth() - 1);

                // 주간 ?�균
                const weeklyResponse = await axios.get(
                    `${API_BASE_URL}/diaries/user/${userid}/average-rating?startDate=${weekAgo.toISOString().split('T')[0]}&endDate=${targetDateObj.toISOString().split('T')[0]}`
                );
                
                // ?�간 ?�균
                const monthlyResponse = await axios.get(
                    `${API_BASE_URL}/diaries/user/${userid}/average-rating?startDate=${monthAgo.toISOString().split('T')[0]}&endDate=${targetDateObj.toISOString().split('T')[0]}`
                );

                setAverageScore({
                    weekly: weeklyResponse.data.averageRating || 0,
                    monthly: monthlyResponse.data.averageRating || 0
                });
            } catch (error) {
                console.error("?�수�?불러?�는 �??�류가 발생?�습?�다:", error);
            }
        }
        fetchDiaryScores();
    }, [userid, date]);

    return (
        <div className="diary-container">
            <AppNavbar />
            <div className="staravg-back" onClick={backHandler}>
                <img src="./img/button/arrow-left.png" alt="?�돌?��?�? />
            </div>

            <div className="staravg-container">
                <h2 className="staravg-title">My Score</h2>
                
                <div className="diary-padding"/>
                <div className="staravg-center">
                    <div className="border-score">
                        <div className="staravg-line">?�주??별점</div>
                        <div className="star-rating">{renderStars(averageScore.weekly)}</div>
                        <div className="avgscore">{averageScore.weekly.toFixed(1)}</div>
                        <div className="score-message">{getMessage(averageScore.weekly)}</div>
                    </div>

                    <div className="diary-padding"/>

                    <div className="border-score">
                        <div className="staravg-line">????별점</div>
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
