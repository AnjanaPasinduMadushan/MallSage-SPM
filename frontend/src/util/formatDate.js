export const formatDate = (inputDateStr, format) => {
  const date = new Date(inputDateStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();
  const hours24 = String(date.getHours()).padStart(2, "0");
  const hours12 = String(date.getHours() % 12 || 12);
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  // Define an array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Replace placeholders in the format string with actual date and time components
  const formattedDate = format
    .replace('dd', day)
    .replace('mm', month)
    .replace('yyyy', year)
    .replace('HH', hours24)
    .replace('hh', hours12)
    .replace('MM', minutes)
    .replace('ss', seconds)
    .replace('A', ampm)
    .replace('month', monthNames[date.getMonth()]);

  return formattedDate;
};
