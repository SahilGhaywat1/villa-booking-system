// utils/notifications.js
export const addNotification = (message) => {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const newNotification = {
      id: notifications.length + 1,
      message,
      timestamp: new Date().toLocaleString(),
    };
    notifications.unshift(newNotification); // Add to the beginning of the array
    localStorage.setItem('notifications', JSON.stringify(notifications));
    window.dispatchEvent(new Event('storage')); // Trigger storage event to update components
  };