import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import isInclusivelyBeforeDay from '../src/utils/isInclusivelyBeforeDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';
import { addDays, addMonths } from 'date-fns';

const TestCustomInputIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    C
  </span>
);

const TestCustomArrowIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    {'--->'}
  </span>
);

const TestCustomCloseIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >'X'</span>
);

storiesOf('DRP - Input Props', module)
  .add('default', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addMonths(new Date(), 3)}
      initialEndDate={addDays(addMonths(new Date(), 3), 10)}
    />
  )))
  .add('disabled', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addMonths(new Date(), 3)}
      initialEndDate={addDays(addMonths(new Date(), 3), 10)}
      disabled
    />
  )))
  .add('disabled start date', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addMonths(new Date(), 3)}
      initialEndDate={addDays(addMonths(new Date(), 3), 10)}
      disabled="startDate"
      isOutsideRange={day => !isInclusivelyAfterDay(day, addMonths(new Date(), 3))}
    />
  )))
  .add('disabled end date', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addMonths(new Date(), 3)}
      initialEndDate={addDays(addMonths(new Date(), 3), 10)}
      disabled="endDate"
      isOutsideRange={day => !isInclusivelyAfterDay(day, new Date()) ||
        !isInclusivelyBeforeDay(day, addDays(addMonths(new Date(), 3), 10))}
    />
  )))
  .add('readOnly', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addMonths(new Date(), 3)}
      initialEndDate={addDays(addMonths(new Date(), 3), 10)}
      readOnly
    />
  )))
  .add('with clear dates button', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showClearDates
    />
  )))
  .add('reopens DayPicker on clear dates', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showClearDates
      reopenPickerOnClearDates
    />
  )))
  .add('with custom display format', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      displayFormat="MMM d"
    />
  )))
  .add('with show calendar icon', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showDefaultInputIcon
    />
  )))
  .add('with custom show calendar icon', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      customInputIcon={<TestCustomInputIcon />}
    />
  )))
  .add('with custom arrow icon', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      customArrowIcon={<TestCustomArrowIcon />}
    />
  )))
  .add('with custom close icon', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showClearDates
      customCloseIcon={<TestCustomCloseIcon />}
    />
  )))
  .add('with show calendar icon after input', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showDefaultInputIcon
      inputIconPosition="after"
    />
  )))
  .add('with screen reader message', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      screenReaderInputMessage="Here you could inform screen reader users of the date format, minimum nights, blocked out dates, etc"
    />
  )))
  .add('with custom Start & End Date title attributes', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      startDateTitleText="Here you can set the title attribute of the Start input, which shows in the tooltip on :hover over the field"
      endDateTitleText="Here you can set the title attribute of the End input, which shows in the tooltip on :hover over the field"
    />
  )))
  .add('noBorder', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      noBorder
    />
  )))
  .add('block styling', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showClearDates
      block
    />
  )))
  .add('small styling', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showClearDates
      small
    />
  )))
  .add('regular styling', withInfo()(() => (
    <DateRangePickerWrapper
      initialStartDate={addDays(new Date(), 3)}
      initialEndDate={addDays(new Date(), 10)}
      showClearDates
      regular
    />
  )));
