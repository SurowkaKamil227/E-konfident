import { utils } from './utils';
import { DatePicker } from './elements/DatePicker';

export const { getFormatedDate, getToday } = new utils({ isGregorian: true });
export default DatePicker;
