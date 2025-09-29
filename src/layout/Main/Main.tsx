import styled from '@emotion/styled';
import data from 'data.json';
import mainImg from '@/assets/images/05.webp'

const Main = () => {
  const { greeting } = data;
  return (
    <div>
      <MainImg src={mainImg} />
      <MainTitle>{greeting.title}</MainTitle>
      <SubTitle>{greeting.eventDetail}</SubTitle>
    </div>
  );
};

export default Main;

const MainImg = styled.img`
  border-radius: 200px 200px 0 0;
  width: 90%;
  max-width: 450px;
  padding-top: 20px;
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 85%;
    max-width: 300px;
    padding-top: 15px;
  }
  
  @media (max-width: 480px) {
    width: 80%;
    max-width: 250px;
    padding-top: 12px;
  }
  
  @media (max-width: 360px) {
    width: 75%;
    max-width: 200px;
    padding-top: 10px;
  }
`;

const MainTitle = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 2.2rem;
  color: #2F2120;
  line-height: 120%;
  white-space: pre-line;
  font-weight: 600;
  
  /* Mobile responsive - giảm để tương đương zoom 70% */
  @media (max-width: 768px) {
    font-size: 1.6rem; /* ~70% của 2.2rem */
    line-height: 115%;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    line-height: 110%;
  }
  
  @media (max-width: 360px) {
    font-size: 1.2rem;
    line-height: 110%;
  }
`;

const SubTitle = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: 1.1rem;
  color: #2F2120;
  line-height: 140%;
  white-space: pre-line;
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 0.85rem; /* ~70% của 1.1rem */
    line-height: 135%;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 130%;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
    line-height: 125%;
  }
`;
