const today = new Date();

export let hour = today.getHours();
export const ampm = hour >= 12 ? 'PM' : 'AM';
hour = hour % 12 || 12;

export const minutes = String(today.getMinutes()).padStart(2, '0');
export const seconds = String(today.getSeconds()).padStart(2, '0');

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayName = dayNames[today.getDay()];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthName = monthNames[today.getMonth()];

export const year = today.getFullYear();



