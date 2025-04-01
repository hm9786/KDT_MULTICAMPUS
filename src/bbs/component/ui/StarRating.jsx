import React from "react";
import styled from "styled-components";

// 별 아이콘 스타일
const StarContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Star = styled.span`
  font-size: 30px; /* 별 크기 조절 */
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")}; /* 채워진 별과 빈 별 색상 */
  margin-right: 5px; /* 별 사이 간격 */
`;

function StarRating({ score, setScore }) {
  const handleStarClick = (index) => {
    if (score === index + 1) {
      setScore(0);
    } else {
      setScore(index + 1);
    }
  };

  return (
    <StarContainer>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} onClick={() => handleStarClick(index)}>
          {index < score ? '🌟' : '⭐️'}
          {/* {index < score ? '★' : '☆'} */}
        </Star>
      ))}
    </StarContainer>
  );
}


export default StarRating;
