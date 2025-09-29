import styled from '@emotion/styled';

const Container = styled.div`
  border: 30px solid transparent; /* 테두리의 초기 값 설정 */
  border-image-source: url('/background.png'); /* 이미지 경로 설정 */
  border-image-slice: 30% 49%; /* 이미지의 크기 설정 */
  border-image-width: 280px; /* 테두리 이미지의 너비 설정 */
  background-color: #ffffff;
  width: 85vw;
  margin: 0 auto;
  max-width: 100vw; /* Đảm bảo không vượt quá viewport */
  box-sizing: border-box; /* Bao gồm border trong tính toán width */
  
  /* Mobile optimization */
  @media screen and (max-width: 768px) {
    width: 95vw; /* Sử dụng nhiều không gian hơn trên mobile */
    border-image-width: 150px; /* Giảm border width cho mobile */
    border-width: 20px; /* Giảm border width */
  }
  
  @media screen and (max-width: 480px) {
    width: 98vw;
    border-image-width: 100px; /* Giảm thêm cho màn hình rất nhỏ */
    border-width: 15px;
  }
  
  @media screen and (max-width: 360px) {
    width: 99vw;
    border-image-width: 80px;
    border-width: 12px;
  }
  
  @media screen and (min-width: 500px) {
      width: 500px;
      border-image-width: 280px; /* Giữ nguyên cho desktop */
      border-width: 30px;
  }
`;
export default Container;
