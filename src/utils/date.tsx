import moment from 'moment'
import { differenceInCalendarDays } from 'date-fns';

export const getRemainingDays = (date) => {
  const currentDate = new Date();
  const expiry = new Date(date);
  const remainingDays = differenceInCalendarDays(expiry, currentDate);
  return remainingDays;
};

export const formattedDate = (date: any) =>
  moment?.unix(date)?.format?.('MM/DD/YYYY') ?? date
