export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function daysBetweenDates(start, end) {
  const ONE_DAY = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
  const startMs = start.getTime(); // Get the start date in milliseconds since Unix epoch
  const endMs = end.getTime(); // Get the end date in milliseconds since Unix epoch
  const diffMs = endMs - startMs; // Calculate the difference in milliseconds
  return Math.round(diffMs / ONE_DAY); // Convert milliseconds to days and round to nearest integer
}

export function getCurrentDate() {
  const currentDate = new Date();
  const monthIndex = currentDate.getMonth();
  const monthName = monthNames[monthIndex];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const dateString = `${monthName} ${day.toString().padStart(2, '0')}, ${year}`;
  return dateString;
}
