export declare const formatDate: (unixTimestamp?: number | undefined, dateTime?: string | undefined, format?: string) => string;
/**
 * Return Event Start Time if duration is 23:59:00 or less
 * hours * mints = 24 * 60 = 1440 - 1 mint = 1430
 * @param unixTimestampDuration
 * @param unixTimestampStartTime
 * @param format
 */
export declare const getEventTime: (unixTimestampDuration: number, unixTimestampStartTime: number, format?: string) => string;
export declare const formatDateTime: (unixTimestamp?: number | undefined, format?: string) => string;
export declare const formatDateRange: (startDate: number, endDate: number) => string;
export declare const formatDateRangeWithTime: (startDate: number, endDate: number) => string;
export declare const currentDate: (format?: string) => string;
interface ValidateDateErrorMessage {
    validDateError: string;
    bothFieldError: string;
}
export declare const validateDate: (day: string, month: string, message: ValidateDateErrorMessage) => string;
export {};
//# sourceMappingURL=date.d.ts.map