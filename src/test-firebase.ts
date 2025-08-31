import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Test Firebase connection
const testFirebase = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBNbmtv2E3Tq0pnSMoDNqpsbprm23rK_Ts",
    authDomain: "wedding-invitation-a8321.firebaseapp.com",
    databaseURL: "https://wedding-invitation-a8321-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "wedding-invitation-a8321",
    storageBucket: "wedding-invitation-a8321.firebasestorage.app",
    messagingSenderId: "225498329167",
    appId: "1:225498329167:web:fc92db0232172c4afbba3a"
  };

  try {
    console.log('🔄 Testing Firebase connection...');
    
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    
    console.log('✅ Firebase app initialized');
    
    // Test write
    const testRef = ref(db, 'test');
    await set(testRef, {
      message: 'Test connection',
      timestamp: Date.now()
    });
    
    console.log('✅ Test write successful!');
    
    // Test guestbook structure
    const guestbookRef = ref(db, 'guestbook/test-message');
    await set(guestbookRef, {
      sender: 'Test User',
      message: 'Test message',
      createdAt: Date.now(),
      date: new Date().toLocaleString('vi-VN')
    });
    
    console.log('✅ Guestbook test successful!');
    
  } catch (error: any) {
    console.error('❌ Firebase error:', error);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
  }
};

// Run test
testFirebase();

export default testFirebase;
