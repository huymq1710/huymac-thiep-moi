import styled from '@emotion/styled';

export const Heading1 = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin: 10px;
  color: #e88ca6;
  white-space: pre-line;
  font-weight: 600;
`;

export const Heading2 = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
`;

export const PointTitle = styled.p`
  font-family: 'Playfair Display', serif;
  line-height: 1;
  margin: 0;
  color: #e88ca6;
  white-space: pre-line;
  font-weight: 500;
`;

export const Paragraph = styled.p`
  font-family: 'Crimson Text', serif;
  line-height: 2.2rem;
  white-space: pre-line;
`;

export const Caption = styled.p<{ textAlign?: string }>`
  font-family: 'Crimson Text', serif;
  font-weight: 300;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  white-space: pre-line;
`;
