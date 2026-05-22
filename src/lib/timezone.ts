// Timezone utilities for Asia/Kolkata
export const TIMEZONE = 'Asia/Kolkata';

export const formatDateIST = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(d);
};

export const getCurrentIST = (): Date => {
  return new Date(new Date().toLocaleString('en-US', { timeZone: TIMEZONE }));
};

export const toISTString = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', { timeZone: TIMEZONE });
};

export const scheduleAtIST = (hours: number, minutes: number = 0): Date => {
  const now = getCurrentIST();
  const scheduled = new Date(now);
  scheduled.setHours(hours, minutes, 0, 0);
  
  // If time has passed today, schedule for tomorrow
  if (scheduled <= now) {
    scheduled.setDate(scheduled.getDate() + 1);
  }
  
  return scheduled;
};

// Daily reminder job time (9:30 AM IST)
export const DAILY_REMINDER_TIME = { hours: 9, minutes: 30 };