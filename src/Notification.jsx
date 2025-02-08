import { useEffect } from 'react';
// import './Notification.css'; // CSS ফাইল যোগ করুন

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 সেকেন্ড পর নোটিফিকেশন বন্ধ হবে

    return () => clearTimeout(timer); // Cleanup টাইমার
  }, [onClose]);

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;