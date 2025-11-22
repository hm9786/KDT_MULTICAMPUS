import React from "react";
import styled from "styled-components";

// ë³??„ì´ì½??¤í???
const StarContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Star = styled.span`
  font-size: 30px; /* ë³??¬ê¸° ì¡°ì ˆ */
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")}; /* ì±„ì›Œì§?ë³„ê³¼ ë¹?ë³??‰ìƒ */
  margin-right: 5px; /* ë³??¬ì´ ê°„ê²© */
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
          {index < score ? '?ŒŸ' : 'â­ï¸'}
          {/* {index < score ? '?? : '??} */}
        </Star>
      ))}
    </StarContainer>
  );
}


export default StarRating;
