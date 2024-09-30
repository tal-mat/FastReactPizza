// Formats a numeric value as a currency string in Euros
export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

// Formats a date string into a readable format (e.g., "1 Jan, 12:00")
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

// Calculates the number of minutes left until a given date string
export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

// Validates a phone number format, allowing optional country codes and various separators like spaces, hyphens, and dots
export function isValidPhone(str) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
}

// Checks if a string contains only English letters (A-Z, a-z) with one space between words, cannot be empty or only spaces
export function isValidName(str) {
  return /^(?! )[a-zA-Z]+( [a-zA-Z]+)*(?! )$/.test(str);
}
