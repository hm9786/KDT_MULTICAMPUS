import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../../utils/api";
import '../../style/Profile.css';

function Reward({ userId }) {
  const [point, setPoint] = useState(0);  // 초기값을 숫자 0으로 설정
  const [imgSrc, setImgSrc] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    console.log('Reward User ID:', userId);
    const fetchPoint = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/reward/${userId}`);
        setPoint(response.data.points || 0); // 서버에서 반환한 포인트값을 설정
      } catch (error) {
        console.error("포인트를 가져오는데 실패했습니다:", error);
        setPoint(0); // 오류 시 기본 포인트값을 0으로 설정
      }
    };

    if (userId) {  // userId가 존재할 때만 fetchPoint 호출
      fetchPoint();
    }
  }, [userId]);

  useEffect(() => {
    if (point >= 3000) {
      setImgSrc(process.env.PUBLIC_URL + '/img/reward/growing-fruit.png');
      setLevel("열매");
    } else if (point >= 1950) {
      setImgSrc(process.env.PUBLIC_URL + '/img/reward/growing-flower.png');
      setLevel("꽃");
    } else if (point >= 1050) {
      setImgSrc(process.env.PUBLIC_URL + '/img/reward/growing-tree.png');
      setLevel("나무");
    } else if (point >= 450) {
      setImgSrc(process.env.PUBLIC_URL + '/img/reward/growing-sapling.png');
      setLevel("묘목");
    } else if (point >= 150) {
      setImgSrc(process.env.PUBLIC_URL + '/img/reward/growing-sprout.png');
      setLevel("새싹");
    } else {
      setImgSrc(process.env.PUBLIC_URL + '/img/reward/growing-seed.png');
      setLevel("씨앗");
    }
  }, [point]);

  return (
    <div className="reward-container">
      <div className="reward-title">
        <span>Reward</span>
      </div>
      <div className="reward-start">
        <span className="reward-line">현재 당의 레벨은 &nbsp;</span>
        <span className="reward-level"> ' {level} ' </span>
        <span className="reward-line">&nbsp; 입니다</span>
      </div>
      <div className="reward-point-display">
        <span className="reward-line">현재 포인트: {point}점</span>
      </div>
      <div className="reward-img-container">
        <img src={imgSrc} alt="리워드 이미지" className="reward-img" />
      </div>
    </div>
  );
}

export default Reward;
