// import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
// import { increment, onValue, ref, update } from 'firebase/database';
// import { realtimeDb } from 'firebase.ts';
import JSConfetti from 'js-confetti';
import Heart from '@/assets/icons/heart_plus.svg?react';
import Share from '@/assets/icons/share.svg?react';
import Upward from '@/assets/icons/upward.svg?react';
import Button from '@/components/Button.tsx';

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const { emojis } = data;

  // TODO: count 기능 사용 원할시 firebase realtime db 연결!
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  // TODO: realtime db 에 likes 객체 추가.
  //   const dbRef = ref(realtimeDb, 'likes');
  //   onValue(dbRef, (snapshot) => {
  //     setCount(Number(snapshot.val()));
  //   });
  // }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert('Địa chỉ đã được sao chép.😉😉');
      },
      () => {
        alert('Sao chép địa chỉ thất bại.🥲🥲');
      },
    );
  };

  const handleCount = () => {
    void jsConfetti.addConfetti({ emojis });

    // 버튼 클릭시 likes 수 증가
    // const dbRef = ref(realtimeDb);
    // void update(dbRef, {
    //   likes: increment(1),
    // });
  };

  const handleViewComments = () => {
    // Tạo một trang mới để xem tất cả lời chúc
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Tất cả lời chúc - Đám cưới</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0; 
              padding: 20px; 
              background-color: #f8f9fa;
              line-height: 1.6;
            }
            .container { 
              max-width: 800px; 
              margin: 0 auto; 
              background: white; 
              padding: 20px; 
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              padding-bottom: 20px;
              border-bottom: 2px solid #eee;
            }
            .back-btn { 
              margin-bottom: 20px; 
              padding: 10px 15px; 
              background: #007bff; 
              color: white; 
              border: none; 
              border-radius: 5px; 
              cursor: pointer;
              font-size: 14px;
            }
            .back-btn:hover { background: #0056b3; }
            .comment { 
              margin: 15px 0; 
              padding: 15px; 
              border: 1px solid #eee; 
              border-radius: 8px;
              background: #fafafa;
            }
            .comment-header { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 10px;
              font-weight: bold;
            }
            .comment-message { 
              white-space: pre-wrap; 
              color: #333;
            }
            .loading { 
              text-align: center; 
              color: #666; 
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💝 Tất cả lời chúc</h1>
              <button class="back-btn" onclick="window.close()">← Đóng cửa sổ</button>
            </div>
            <div id="comments-container">
              <div class="loading">Đang tải lời chúc...</div>
            </div>
          </div>
          
          <script type="module">
            import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
            import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
            
            // Firebase config from environment variables
            const firebaseConfig = {
              apiKey: "${import.meta.env.VITE_FIREBASE_API_KEY}",
              authDomain: "${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}",
              databaseURL: "${import.meta.env.VITE_FIREBASE_DATABASE_URL}",
              projectId: "${import.meta.env.VITE_FIREBASE_PROJECT_ID}",
              storageBucket: "${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}",
              messagingSenderId: "${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}",
              appId: "${import.meta.env.VITE_FIREBASE_APP_ID}"
            };
            
            try {
              const app = initializeApp(firebaseConfig);
              const db = getDatabase(app);
              const guestbookRef = ref(db, 'guestbook');
              
              onValue(guestbookRef, (snapshot) => {
                const data = snapshot.val();
                const container = document.getElementById('comments-container');
                
                if (data) {
                  const comments = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                  })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                  
                  container.innerHTML = comments.map(comment => \`
                    <div class="comment">
                      <div class="comment-header">
                        <span>\${comment.sender || 'Ẩn danh'}</span>
                        <span>\${comment.date || ''}</span>
                      </div>
                      <div class="comment-message">\${comment.message || ''}</div>
                    </div>
                  \`).join('');
                } else {
                  container.innerHTML = '<div class="loading">Chưa có lời chúc nào 💌</div>';
                }
              });
            } catch (error) {
              console.error('Firebase error:', error);
              document.getElementById('comments-container').innerHTML = 
                '<div class="loading">Không thể tải lời chúc. Vui lòng kiểm tra cấu hình Firebase.</div>';
            }
          </script>
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const jsConfetti = new JSConfetti();
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav isVisible={isVisible}>
      <Button onClick={handleCount}>
        <Heart fill="#e88ca6" />
        {/*{count || ''}*/}
      </Button>
      <Button onClick={handleCopy}>
        <Share fill="#e88ca6" />
        Chia sẻ
      </Button>
      <Button onClick={handleViewComments}>
        💌
        Lời chúc
      </Button>
      <Button onClick={handleScroll}>
        <Upward fill="#e88ca6" />
        Lên trên
      </Button>
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ isVisible: boolean }>`
  min-width: 320px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;
