import styled from '@emotion/styled';

const Wrapper = styled.section`
  padding: 30px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #222;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  /* Mobile optimization */
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 10px;
  }
  
  @media (max-width: 360px) {
    padding: 12px 8px;
  }
`;

export default Wrapper;
