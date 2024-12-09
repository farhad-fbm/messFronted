export function updateClock() {
  const today = new Date();
  //......
  let hour = today.getHours();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  // ...........
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  //.........
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[today.getDay()];
  //.........
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = monthNames[today.getMonth()];
  //.........
  const year = today.getFullYear();

  return ({ hour, ampm, minutes, seconds, dayName, monthName, year })
}

