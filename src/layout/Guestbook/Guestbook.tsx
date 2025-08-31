import styled from '@emotion/styled';
import { useState } from 'react';
import CommentForm from './CommentForm.tsx';
import CommentList from './CommentList.tsx';
import { Heading2 } from '@/components/Text.tsx';

const Guestbook = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <GuestBookWrapper>
      <Heading2>
        Vui lòng để lại lời chúc.
        <br />
        Lời chúc sẽ được lưu lại, và được chuyển đến cô dâu chú rể.
      </Heading2>
      <CommentForm />
      
      <ToggleButton onClick={() => setShowComments(!showComments)}>
        {showComments ? '🔼 Ẩn lời chúc' : '🔽 Xem lời chúc đã gửi'}
      </ToggleButton>
      
      {showComments && (
        <CommentsSection>
          <CommentsTitle>Lời chúc từ mọi người 💝</CommentsTitle>
          <CommentList />
        </CommentsSection>
      )}
    </GuestBookWrapper>
  );
};

export default Guestbook;

const GuestBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 50px;
`;

const ToggleButton = styled.button`
  padding: 10px 16px;
  margin-top: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
    border-color: #bbb;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const CommentsSection = styled.div`
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
`;

const CommentsTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  color: #333;
  text-align: center;
`;
