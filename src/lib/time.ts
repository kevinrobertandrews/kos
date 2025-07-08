export default {
  YYYYMMDD: () => new Date().toISOString().slice(0, 10),
  since: (timestamp: string): number => {
    const time = new Date(timestamp).getTime();
    const now = new Date().getTime();
    const diff = now - time;
    const hours = diff / 1000 / 60 / 60;
    return hours;
  },
  timestamp: () => new Date().toISOString(),
};
