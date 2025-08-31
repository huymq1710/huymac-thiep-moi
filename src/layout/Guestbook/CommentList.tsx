import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ref, onValue, DataSnapshot } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';

interface Comment {
  id: string;
  sender: string;
  message: string;
  createdAt: number;
  date: string;
}

const CommentList = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!realtimeDb) {
      setLoading(false);
      return;
    }

    const guestbookRef = ref(realtimeDb, 'guestbook');
    
    const unsubscribe = onValue(guestbookRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => b.createdAt - a.createdAt); // Sort by newest first
        setComments(commentsList);
      } else {
        setComments([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!realtimeDb) {
    return <EmptyText>Tính năng lời chúc chưa được cấu hình. Vui lòng thiết lập Firebase Realtime Database. 🔧</EmptyText>;
  }

  if (loading) {
    return <LoadingText>Đang tải lời chúc...</LoadingText>;
  }

  if (comments.length === 0) {
    return <EmptyText>Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc! 💌</EmptyText>;
  }

  return (
    <CommentListWrapper>
      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <CommentHeader>
            <SenderName>{comment.sender}</SenderName>
            <CommentDate>{comment.date}</CommentDate>
          </CommentHeader>
          <CommentMessage>{comment.message}</CommentMessage>
        </CommentItem>
      ))}
    </CommentListWrapper>
  );
};

export default CommentList;

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
`;

const CommentItem = styled.div`
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SenderName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const CommentMessage = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #555;
  font-size: 0.9rem;
  white-space: pre-wrap;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
`;

const EmptyText = styled.div`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin-top: 20px;
`;
