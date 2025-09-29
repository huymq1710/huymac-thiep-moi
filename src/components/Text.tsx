import styled from '@emotion/styled';

export const Heading1 = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin: 10px;
  color: #e88ca6;
  white-space: pre-line;
  font-weight: 600;
  line-height: 1.3;
  
  /* Mobile responsive - giảm size để tương đương zoom 70% */
  @media (max-width: 768px) {
    font-size: 1.05rem; /* ~70% của 1.5rem */
    margin: 6px 0;
    padding: 0 8px;
    /* Cho phép từ được chia nếu quá dài */
    word-break: keep-all;
    overflow-wrap: break-word;
    hyphens: auto;
    /* Điều chỉnh line-height để text gần nhau hơn khi xuống dòng */
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 5px 0;
    padding: 0 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 0.95rem;
    padding: 0 4px;
  }
`;

export const Heading2 = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 0.85rem; /* ~70% của 1rem */
    margin: 7px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: 6px 0;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
    margin: 5px 0;
  }
`;

export const PointTitle = styled.p`
  font-family: 'Playfair Display', serif;
  line-height: 1.2;
  margin: 0 0 8px 0;
  color: #e88ca6;
  white-space: pre-line;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #e88ca6, transparent);
    border-radius: 1px;
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 0.8rem; /* ~70% của 1.1rem */
    margin: 0 0 4px 0;
    /* Tránh xuống dòng không mong muốn */
    word-break: keep-all;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin: 0 0 4px 0;
  }
  
  @media (max-width: 360px) {
    font-size: 0.7rem;
  }
`;

export const Paragraph = styled.p`
  font-family: 'Crimson Text', serif;
  line-height: 2rem;
  white-space: pre-line;
  color: #44484d;
  text-align: center;
  margin: 16px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(232, 140, 166, 0.1);
  
  /* Mobile responsive - giảm size để tương đương zoom 70% */
  @media (max-width: 768px) {
    padding: 12px 8px;
    margin: 8px 6px;
    font-size: 0.8rem; /* ~70% để tương đương zoom 70% */
    line-height: 1.4rem;
    /* Đảm bảo văn bản không bị cắt xấu */
    word-break: keep-all;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  @media (max-width: 480px) {
    padding: 10px 6px;
    margin: 7px 4px;
    font-size: 0.75rem;
    line-height: 1.3rem;
  }
  
  @media (max-width: 360px) {
    padding: 8px 5px;
    margin: 6px 3px;
    font-size: 0.7rem;
    line-height: 1.2rem;
  }
`;

export const Caption = styled.p<{ textAlign?: string }>`
  font-family: 'Crimson Text', serif;
  font-weight: 400;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  white-space: pre-line;
  color: #44484d;
  line-height: 1.6;
  margin: 8px 0;
`;
