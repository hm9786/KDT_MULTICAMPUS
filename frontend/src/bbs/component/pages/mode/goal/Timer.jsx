import React, { useEffect } from 'react';
import { saveTotalTimeToDB } from '../goal/api.js';

const Timer = ({ isRunning, setIsRunning, totalTime, setTotalTime, isLoaded, goalId, taskId, date }) => {
  useEffect(() => {
    let timer;
    let dailySaveTimer;

    // 시간 증가 타이머 설정 (isRunning 상태에 따라)
    if (isRunning) {
      timer = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timer) {
      clearInterval(timer); // 타이머 중지
    }

    // 자정까지 남은 시간 계산 (23시 59분 59초까지)
    const timeUntilMidnight = getTimeUntilMidnight();

    // 자정까지 기다렸다가 작업 시작
    setTimeout(async () => {
      const success = await saveTotalTimeToDB(goalId, taskId, totalTime);
      if (success) {
        setTotalTime(0); // 누적 시간 초기화
      }

      // 자정이 된 후, 다시 자정까지 남은 시간을 기다리도록 설정
      dailySaveTimer = setInterval(async () => {
        const success = await saveTotalTimeToDB(goalId, taskId, totalTime);
        if (success) {
          setTotalTime(0); // 누적 시간 초기화
        }
      }, 86400000); // 24시간(밀리초)

    }, timeUntilMidnight); // 자정까지 남은 시간만큼 대기

    // cleanup: 컴포넌트가 언마운트될 때 타이머 정리
    return () => {
      clearInterval(timer);  // 시간 증가 타이머 정리
      clearInterval(dailySaveTimer); // 자정 타이머 정리
      if (!isRunning && goalId && taskId) {
        saveTotalTimeToDB(goalId, taskId, totalTime); // 타이머가 멈췄을 때, 누적된 시간 저장
      }
    };
  }, [isRunning, totalTime, setTotalTime, goalId, taskId]); // 의존성 배열에 setTotalTime 추가

  // 자정까지 남은 시간 계산 함수
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 0);  // 자정 23시 59분 59초 설정

    return midnight.getTime() - now.getTime(); // 현재 시간에서 자정까지의 차이 (밀리초)
  };

  // "시:분:초" 형식의 문자열로 변환하는 함수
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="goal-timer-wrapper">
      <h1 className="goal_timer">⏱️</h1>
      <p className="goal_total-time">누적 시간 {formatTime(totalTime)}</p>
      <div className="goal-timer-buttons">
        <button className="goal_button start" onClick={() => setIsRunning(true)}>start</button>
        <button className="goal_button" onClick={async () => {
          setIsRunning(false);
          if (isLoaded && goalId && taskId) {
            await saveTotalTimeToDB(goalId, taskId, totalTime);
          }
        }}>stop</button>
      </div>
    </div>
  );
};

export default Timer;

