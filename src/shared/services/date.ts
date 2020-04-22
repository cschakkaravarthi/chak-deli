import moment, { unix } from 'moment-timezone';

export const formatDate = (
  unixTimestamp?: number,
  dateTime?: string,
  format = 'default'
): string => {
  const formats: any = {
    default: 'MMMM D, YYYY'
  };

  return unixTimestamp ? unix(unixTimestamp).format(formats[format]) : '' || dateTime ? moment(dateTime).format(formats[format]) : '';
};

export const formatUnixMilliseconds = (
  unixTimeStamp: number,
  format = 'll'
): string => {
  return moment(unixTimeStamp).format(format);
};

/**
 * Return Event Start Time if duration is 23:59:00 or less
 * hours * mints = 24 * 60 = 1440 - 1 mint = 1430
 * @param unixTimestampDuration
 * @param unixTimestampStartTime
 * @param format
 */
export const getEventTime = (unixTimestampDuration: number, unixTimestampStartTime: number, format = 'default'): string => {
  const formats: any = {
    default: 'HH:mm A'
  };
  return unixTimestampDuration < 1439 ? unix(unixTimestampStartTime).format(formats[format]) : '';
};

export const formatDateTime = (
  unixTimestamp?: number | string,
  format = 'default'
): string => {
  const formats: any = {
    default: 'MMMM D, YYYY HH:mm A z',
    noTZ: 'lll',
    noTime: 'll'
  };

  if (!unixTimestamp) {
    return '';
  }

  return typeof (unixTimestamp) === 'number'
    ? unix(unixTimestamp).tz('America/Los_Angeles').format(formats[format])
    : `${moment(unixTimestamp).format(formats[format])}  PST`;
};

export const formatDateRange = (
  startDate: number,
  endDate: number
): string => {
  return `${formatDateTime(startDate, 'noTime')} - ${formatDateTime(endDate, 'noTime')}`;
};

export const formatDateRangeWithTime = (
  startDate: number,
  endDate: number
): string => `${formatDateTime(startDate, 'noTZ')} - ${formatDateTime(endDate, 'noTZ')}`;

export const currentDate = (
  format = 'default'
): string => {
  const formats: any = {
    default: 'YYYY-MM-DD'
  };
  const date = moment().format(formats[format]).toString();
  return date;
};

interface ValidateDateErrorMessage {
  validDateError: string;
  bothFieldError: string;
}
// To check wether the user given date is valid or not.
export const validateDate = (day: string, month: string, message: ValidateDateErrorMessage): string => {
  let isValidDate = '';
  if (day || month) {
    if (day && month) {
      isValidDate = new Date(`${month}-${day}`).getDate().toString();
      if (day !== isValidDate && day !== '29') {
        return message.validDateError;
      }
    } else {
      return message.bothFieldError;
    }
  }
  return '';
};
