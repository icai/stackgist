import * as moment from 'moment';

export const nowISO = () => {
  // "2014-09-08T08:02:17-05:00" (ISO 8601, no fractional seconds)
  return moment().format();
};
