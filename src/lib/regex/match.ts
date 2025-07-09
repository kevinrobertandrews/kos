export const match = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i,
  phone: /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/,
  date: /\b\d{4}-\d{2}-\d{2}\b/, // ISO date
  time: /\b\d{2}:\d{2}(?::\d{2})?\b/, // HH:mm or HH:mm:ss
  url: /https?:\/\/[^\s]+/,
};
