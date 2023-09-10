export const formatDate = (inputDateStr) => {
  const date = new Date(inputDateStr);

  // Get date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();

  // Get time components
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date as "dd/mm/yyyy hh:mm:ss"
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}