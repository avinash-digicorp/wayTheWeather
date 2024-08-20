import moment from 'moment'

export const formattedDate = (date: any) =>
  moment?.unix(date)?.format?.('MM/DD/YYYY') ?? date
