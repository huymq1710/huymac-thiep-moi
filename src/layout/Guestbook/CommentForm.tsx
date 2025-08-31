import { useState } from 'react';
import styled from '@emotion/styled';
import { push, ref, serverTimestamp } from 'firebase/database';
import { realtimeDb } from '../../firebase.ts';

const CommentForm = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !message) {
      alert('Vui lòng điền tên và lời nhắn. 🥹');
      return;
    }

    if (!realtimeDb) {
      alert('Tính năng gửi lời chúc chưa được cấu hình. Vui lòng thiết lập Firebase Realtime Database. 😔');
      return;
    }

    try {
      const guestbookRef = ref(realtimeDb, 'guestbook');
      const guestbookMessage = {
        sender: name,
        message: message,
        createdAt: serverTimestamp(),
        date: new Date().toLocaleString('vi-VN'),
      };
      
      await push(guestbookRef, guestbookMessage);
      alert('Lời chúc đã được gửi thành công! 💌');
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Lỗi khi gửi lời chúc:', error);
      alert('Có lỗi xảy ra khi gửi lời chúc. Vui lòng thử lại! 😔');
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <NameInput
        placeholder="Tên"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MessageInput
        placeholder="Lời nhắn"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SubmitButton type="submit">Gửi lời chúc</SubmitButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: visible;
  align-items: center;
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1;
  outline: none;
  border: 1px solid #ccc;
  font-family: inherit;
  font-weight: 300;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-weight: 300;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  background-color: white;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
`;
export default CommentForm;
