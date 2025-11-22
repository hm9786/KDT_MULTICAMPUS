import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../ui/bar/AppNavbar";
import DiarySidebar from "../../ui/bar/DiarySidebar";
import StarRating from "../../ui/StarRating";
import API_BASE_URL from "../../../../utils/api";
import axios from "axios";
import "../../style/Diary.css";
import "../../style/Page.css";

function Diary() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const userId = parseInt(localStorage.getItem('userId') || '0');
    
    // userId 유효성 검사
    useEffect(() => {
        if (!userId || userId === 0) {
            navigate('/login');
        }
    }, [userId, navigate]);
    
    const [diaryDate, setDiaryDate] = useState(new Date().toISOString().split('T')[0]);
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState('');
    const [todayGoal, setTodayGoal] = useState('');
    const [content, setContent] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [existingDiary, setExistingDiary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sidebarHandler = () => {
        setIsOpen(!isOpen);
    };

    // 날씨 API 가져오기
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
                if (!apiKey) {
                    console.warn('OpenWeatherMap API 키를 설정하지 않았습니다.');
                    setWeather('맑음');
                    setTemperature('20');
                    return;
                }
                const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        q: 'Seoul',
                        appid: apiKey,
                        units: 'metric'
                    }
                });
                const weatherData = response.data;
                setWeather(weatherData.weather[0].main);
                setTemperature(weatherData.main.temp.toFixed(1));
            } catch (error) {
                console.error('날씨 정보를 가져오는 중 오류:', error);
                setWeather('맑음');
                setTemperature('20');
            }
        };
        fetchWeather();
    }, []);

    // 선택한 날짜의 다이어리 불러오기
    useEffect(() => {
        const fetchDiary = async () => {
            if (!userId || !diaryDate) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/diaries/user/${userId}/date?diary_date=${diaryDate}`);
                if (response.data) {
                    setExistingDiary(response.data);
                    setWeather(response.data.weather || '');
                    setTemperature(response.data.temperature ? response.data.temperature.toString() : '');
                    setTodayGoal(response.data.today_goal || '');
                    setContent(response.data.content || '');
                    setStarRating(response.data.star_rating || 0);
                    setImagePreview(response.data.image_url || '');
                } else {
                    // 다이어리가 없음
                    setExistingDiary(null);
                    setTodayGoal('');
                    setContent('');
                    setStarRating(0);
                    setImagePreview('');
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    // 다이어리가 없음
                    setExistingDiary(null);
                    setTodayGoal('');
                    setContent('');
                    setStarRating(0);
                    setImagePreview('');
                } else {
                    console.error('다이어리를 불러오는 중 오류:', error);
                }
            }
        };
        fetchDiary();
    }, [userId, diaryDate]);

    // 이미지 선택 핸들러
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('이미지 크기는 5MB 이하여야 합니다.');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 이미지 제거
    const handleImageRemove = () => {
        setImageFile(null);
        setImagePreview('');
    };

    // 다이어리 저장
    const handleSave = async () => {
        if (!todayGoal.trim() || !content.trim()) {
            alert('오늘의 목표와 기록을 모두 입력해주세요.');
            return;
        }

        if (starRating === 0) {
            alert('별점을 선택해주세요.');
            return;
        }

        setIsLoading(true);
        try {
            let imageUrl = existingDiary?.image_url || '';

            // 이미지 업로드
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('userId', userId.toString());

                const uploadResponse = await axios.post(`${API_BASE_URL}/upload/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                imageUrl = uploadResponse.data.imageUrl;
            }

            // 다이어리 저장
            const diaryData = {
                user_UN: userId,
                diary_date: diaryDate,
                weather: weather,
                temperature: temperature ? parseFloat(temperature) : null,
                today_goal: todayGoal,
                content: content,
                star_rating: starRating,
                image_url: imageUrl
            };

            await axios.post(`${API_BASE_URL}/diaries`, diaryData);

            // 보상 포인트 지급(다이어리 생성 시 10p)
            try {
                const rewardResponse = await axios.get(`${API_BASE_URL}/reward/${userId}`);
                const currentPoints = rewardResponse.data.points || 0;
                await axios.put(`${API_BASE_URL}/reward/${userId}`, {
                    points: currentPoints + 10
                });

                // 주간 연속 생성 체크 (7일 연속 생성 시 50p 보너스)
                await checkWeeklyBonus();
            } catch (error) {
                console.error('포인트 지급 오류:', error);
            }

            alert('다이어리가 저장되었습니다!');
            // 현재 다이어리 다시 불러오기
            const response = await axios.get(`${API_BASE_URL}/diaries/user/${userId}/date?diary_date=${diaryDate}`);
            if (response.data) {
                setExistingDiary(response.data);
            }
        } catch (error) {
            console.error('다이어리 저장 중 오류:', error);
            alert('다이어리 저장에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 주간 연속 생성 보너스 체크
    const checkWeeklyBonus = async () => {
        try {
            const today = new Date(diaryDate);
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 6);

            let consecutiveDays = 0;
            for (let i = 0; i < 7; i++) {
                const checkDate = new Date(weekAgo);
                checkDate.setDate(checkDate.getDate() + i);
                const dateStr = checkDate.toISOString().split('T')[0];

                try {
                    const response = await axios.get(`${API_BASE_URL}/diaries/user/${userId}/date?diary_date=${dateStr}`);
                    if (response.data && response.data.star_rating > 0) {
                        consecutiveDays++;
                    }
                } catch (error) {
                    // 해당 날짜의 다이어리가 없음
                }
            }

            if (consecutiveDays === 7) {
                // 7일 연속 생성 시 50p 보너스
                const rewardResponse = await axios.get(`${API_BASE_URL}/reward/${userId}`);
                const currentPoints = rewardResponse.data.points || 0;
                await axios.put(`${API_BASE_URL}/reward/${userId}`, {
                    points: currentPoints + 50
                });
                alert('이번 주 연속 생성 보너스 50포인트가 지급되었습니다!');
            }
        } catch (error) {
            console.error('주간 보너스 체크 오류:', error);
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const weekday = weekdays[date.getDay()];
        return `${year}-${month}-${day} (${weekday})`;
    };

    return (
        <div>
            <AppNavbar />
            <DiarySidebar isOpen={isOpen} sidebarHandler={sidebarHandler} />
            
            <div className={`diary-content ${isOpen ? 'sidebar-open' : ''}`}>
                <div className="diary-center">
                    <h1 className="diary-title">Diary</h1>
                    
                    {/* 날짜 선택 */}
                    <div className="diary-padding">
                        <input
                            type="date"
                            value={diaryDate}
                            onChange={(e) => setDiaryDate(e.target.value)}
                            className="diary-date-input"
                        />
                        <div className="diary-date-display">{formatDate(diaryDate)}</div>
                    </div>

                    {/* 날씨 정보 */}
                    <div className="diary-weather">
                        <div className="diary-line-container">
                            <div className="diary-line">날씨: {weather}</div>
                            <div className="diary-line">온도: {temperature}°C</div>
                        </div>
                        <div>
                            <select
                                value={weather}
                                onChange={(e) => setWeather(e.target.value)}
                                className="diary-weather-select"
                            >
                                <option value="맑음">맑음</option>
                                <option value="흐림">흐림</option>
                                <option value="비">비</option>
                                <option value="눈">눈</option>
                                <option value="바람">바람</option>
                            </select>
                            <input
                                type="number"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                placeholder="온도"
                                className="diary-temperature-input"
                                step="0.1"
                            />
                        </div>
                    </div>

                    {/* 오늘의 목표 */}
                    <div className="diary-padding">
                        <label className="diary-label">오늘의 목표 (100자 이내)</label>
                        <textarea
                            value={todayGoal}
                            onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                    setTodayGoal(e.target.value);
                                }
                            }}
                            placeholder="오늘의 목표를 입력하세요"
                            className="diary-goal-input"
                            maxLength={100}
                            rows={3}
                        />
                        <div className="diary-char-count">{todayGoal.length}/100</div>
                    </div>

                    {/* 오늘의 기록 */}
                    <div className="diary-padding">
                        <label className="diary-label">오늘의 기록 (1000자 이내)</label>
                        <textarea
                            value={content}
                            onChange={(e) => {
                                if (e.target.value.length <= 1000) {
                                    setContent(e.target.value);
                                }
                            }}
                            placeholder="오늘 하루를 기록해보세요"
                            className="diary-content-input"
                            maxLength={1000}
                            rows={10}
                        />
                        <div className="diary-char-count">{content.length}/1000</div>
                    </div>

                    {/* 이미지 첨부 */}
                    <div className="diary-padding">
                        <label className="diary-label">이미지 첨부</label>
                        <div className="diary-image-container">
                            {imagePreview && (
                                <div className="diary-image-preview">
                                    <img src={imagePreview} alt="미리보기" />
                                    <button
                                        type="button"
                                        onClick={handleImageRemove}
                                        className="diary-image-remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="diary-image-input"
                                id="diary-image-upload"
                            />
                            <label htmlFor="diary-image-upload" className="diary-image-upload-label">
                                {imagePreview ? '이미지 변경' : '이미지 선택'}
                            </label>
                        </div>
                    </div>

                    {/* 별점 선택 */}
                    <div className="diary-padding">
                        <label className="diary-label">하루 점수 (별점)</label>
                        <div className="diary-star-rating">
                            <StarRating score={starRating} setScore={setStarRating} />
                        </div>
                    </div>

                    {/* 저장 버튼 */}
                    <div className="diary-button-container">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="diary-save-button"
                        >
                            {isLoading ? '저장중..' : existingDiary ? '수정하기' : '저장하기'}
                        </button>
                    </div>

                    <div className="diary-padding-bottom"></div>
                </div>
            </div>
        </div>
    );
}

export default Diary;
