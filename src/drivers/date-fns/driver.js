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

  return formatDate(d, withFormat);
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
      return startOfDay(d);
    case parts.HOURS:
      return startOfHour(d);
    case parts.MINUTES:
      return startOfMinute(d);
    case parts.MONTHS:
      return startOfMonth(d);
    case parts.SECONDS:
      return startOfSecond(d);
    case parts.WEEKDAYS:
      return startOfWeek(d, 1);
    case parts.WEEKS:
      return startOfWeekYear(d);
    case parts.YEARS:
      return startOfYear(d);
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
      return endOfDay(d);
    case parts.HOURS:
      return endOfHour(d);
    case parts.MINUTES:
      return endOfMinute(d);
    case parts.MONTHS:
      return endOfMonth(d);
    case parts.SECONDS:
      return endOfSecond(d);
    case parts.WEEKDAYS:
      return endOfWeek(d, 1);
    case parts.WEEKS:
      return endOfISOWeekYear(d);
    case parts.YEARS:
      return endOfYear(d);
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
    return setDay(d, withParts.weekday, { weekStartsOn: 1 });
  }

  return setDate(d, withParts);
}

function add(d, durationObj) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;
  return addToDate(d, durationObj);
}

function subtract(d, durationObj) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  return sub(d, durationObj);
}

function diff(a, b, part) {
  const dateA = toDateObj(a);
  const dateB = toDateObj(b);

  if (!dateA || !dateB) return null;

  switch (part) {
    case parts.DAYS:
      return differenceInDays(a, b);
    case parts.HOURS:
      return differenceInHours(a, b);
    case parts.MINUTES:
      return differenceInMinutes(a, b);
    case parts.MONTHS:
      return differenceInMonths(a, b);
    case parts.SECONDS:
      return differenceInSeconds(a, b);
    case parts.WEEKDAYS:
      return differenceInWeeks(a, b);
    case parts.WEEKS:
      return differenceInISOWeekYears(a, b);
    case parts.YEARS:
      return differenceInYears(a, b);
    default:
      return null;
  }
}

function get(d, part) {
  const dateObj = toDateObj(d);

  if (!dateObj) return null;

  switch (part) {
    case parts.DAYS:
      return getDay(d);
    case parts.HOURS:
      return getHours(d);
    case parts.MINUTES:
      return getMinutes(d);
    case parts.MONTHS:
      return getMonth(d);
    case parts.SECONDS:
      return getSeconds(d);
    case parts.WEEKDAYS:
      return getDay(d, { weekStartsOn: 1 });
    case parts.WEEKS:
      return getWeekOfMonth(d);
    case parts.YEARS:
      return getYear(d);
    default:
      return null;
  }
}

function daysInMonth(d) {
  const dateObj = toDateObj(d);
  if (!dateObj) return null;
  return getDaysInMonth(d);
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
  return getDay(d, { weekStartsOn: 1 });
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
