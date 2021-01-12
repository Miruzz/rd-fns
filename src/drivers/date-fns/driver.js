import {
  isValid,
  getDaysInMonth,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfSecond,
  startOfWeek,
  startOfYear,
  startOfWeekYear,
  endOfDay,
  endOfHour,
  endOfMinute,
  endOfMonth,
  endOfSecond,
  endOfWeek,
  endOfISOWeekYear,
  endOfYear,
  add as addToDate,
  set as setDate,
  sub,
  differenceInSeconds,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInDays,
  differenceInISOWeekYears,
  differenceInWeeks,
  differenceInYears,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  getWeekOfMonth,
  format as formatDate,
  parseJSON,
  setDay,
  parseISO,
} from 'date-fns';
import parts from '../parts';
import formats from '../formats';

// valid returns whether the given value is a DateTime object
function toDateObj(instance) {
  if (!isValid(new Date(instance))) {
    return null;
  }

  if (typeof instance === 'string') {
    return parseISO(instance);
  }

  return instance;
}

function now() {
  return parseJSON(new Date());
}

function format(d, withFormat = 'T') {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  return formatDate(dateObj, withFormat);
}

// date constructs a new DateTime object as per the driver's interface.
function date(val, withFormat) {
  const dateObj = toDateObj(val);

  if (dateObj) {
    return val;
  }

  if (withFormat) {
    return format(dateObj, withFormat);
  }

  return dateObj;
}

// startOf returns a modified version of the date to start from a given date part.
function startOf(d, part) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  switch (part) {
    case parts.DAYS:
      return startOfDay(dateObj);
    case parts.HOURS:
      return startOfHour(dateObj);
    case parts.MINUTES:
      return startOfMinute(dateObj);
    case parts.MONTHS:
      return startOfMonth(dateObj);
    case parts.SECONDS:
      return startOfSecond(dateObj);
    case parts.WEEKDAYS:
      return startOfWeek(dateObj, 1);
    case parts.WEEKS:
      return startOfWeekYear(dateObj);
    case parts.YEARS:
      return startOfYear(dateObj);
    default:
      return null;
  }
}

// endOf returns a modified version of the date to end from a given date part.
function endOf(d, part) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  switch (part) {
    case parts.DAYS:
      return endOfDay(dateObj);
    case parts.HOURS:
      return endOfHour(dateObj);
    case parts.MINUTES:
      return endOfMinute(dateObj);
    case parts.MONTHS:
      return endOfMonth(dateObj);
    case parts.SECONDS:
      return endOfSecond(dateObj);
    case parts.WEEKDAYS:
      return endOfWeek(dateObj, 1);
    case parts.WEEKS:
      return endOfISOWeekYear(dateObj);
    case parts.YEARS:
      return endOfYear(dateObj);
    default:
      return null;
  }
}

// set sets "parts" of the given date to a specified value.
function set(d, withParts) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  // normalize weekday setter in date-fns
  if (Number.isInteger(withParts.weekday)) {
    return setDay(dateObj, withParts.weekday, { weekStartsOn: 1 });
  }

  return setDate(dateObj, withParts);
}

function add(d, durationObj) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  return addToDate(dateObj, durationObj);
}

function subtract(d, durationObj) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  return sub(dateObj, durationObj);
}

function diff(a, b, part) {
  const dateA = toDateObj(a);
  const dateB = toDateObj(b);

  if (!dateA || !dateB) return null;

  switch (part) {
    case parts.DAYS:
      return differenceInDays(dateA, dateB);
    case parts.HOURS:
      return differenceInHours(dateA, dateB);
    case parts.MINUTES:
      return differenceInMinutes(dateA, dateB);
    case parts.MONTHS:
      return differenceInMonths(dateA, dateB);
    case parts.SECONDS:
      return differenceInSeconds(dateA, dateB);
    case parts.WEEKDAYS:
      return differenceInWeeks(dateA, dateB);
    case parts.WEEKS:
      return differenceInISOWeekYears(dateA, dateB);
    case parts.YEARS:
      return differenceInYears(dateA, dateB);
    default:
      return null;
  }
}

function get(d, part) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  switch (part) {
    case parts.DAYS:
      return getDay(dateObj);
    case parts.HOURS:
      return getHours(dateObj);
    case parts.MINUTES:
      return getMinutes(dateObj);
    case parts.MONTHS:
      return getMonth(dateObj);
    case parts.SECONDS:
      return getSeconds(dateObj);
    case parts.WEEKDAYS:
      return getDay(dateObj, { weekStartsOn: 1 });
    case parts.WEEKS:
      return getWeekOfMonth(dateObj);
    case parts.YEARS:
      return getYear(dateObj);
    default:
      return null;
  }
}

function daysInMonth(d) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  return getDaysInMonth(dateObj);
}

function firstDayOfWeek() {
  return getDay(startOfWeek(new Date()));
}

function formatString(type) {
  switch (type) {
    case formats.DAY:
      return 'd';
    case formats.MONTH:
      return 'MMMM yyyy';
    case formats.WEEKDAY:
      return 'EEEEEE';
    case formats.DISPLAY:
      return 'L';
    case formats.ARIA_LABEL:
      return 'dddd, LL';
    default:
      return 'L';
  }
}

function weekday(d) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  return getDay(dateObj, { weekStartsOn: 1 });
}

const driver = {
  datePropType: null,

  valid: toDateObj,
  date,
  now,
  firstDayOfWeek,

  // Modifiers.
  startOf,
  endOf,
  set,
  add,
  subtract,

  // Getters/formatters
  diff,
  get,
  format,
  formatString,
  daysInMonth,
  weekday,
};

export default driver;
