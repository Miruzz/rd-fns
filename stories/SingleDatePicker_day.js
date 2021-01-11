import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { addMonths, addWeeks } from 'date-fns';

import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import isSameDay from '../src/utils/isSameDay';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';
import { driver } from '../src/drivers/driver';

const datesList = [
  new Date(),
  addMonths(new Date(), 1),
  addMonths(new Date(), 3),
  addMonths(new Date(), 9),
  addMonths(new Date(), 10),
  addMonths(new Date(), 11),
  addMonths(new Date(), 12),
  addMonths(new Date(), 13),
];

storiesOf('SDP - Day Props', module)
  .add('default', withInfo()(() => (
    <SingleDatePickerWrapper autoFocus />
  )))
  .add('allows all days, including past days', withInfo()(() => (
    <SingleDatePickerWrapper
      isOutsideRange={() => false}
      autoFocus
    />
  )))
  .add('allows next two weeks only', withInfo()(() => (
    <SingleDatePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, new Date()) ||
        isInclusivelyAfterDay(day, addWeeks(new Date(), 2))
      }
      autoFocus
    />
  )))
  .add('with some blocked dates', withInfo()(() => (
    <SingleDatePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  )))
  .add('with some highlighted dates', withInfo()(() => (
    <SingleDatePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  )))
  // TODO: refactor to date-fns
  // .add('blocks fridays', withInfo()(() => (
  //   <SingleDatePickerWrapper
  //     isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
  //     autoFocus
  //   />
  // )))
  .add('with custom daily details', withInfo()(() => (
    <SingleDatePickerWrapper
      numberOfMonths={1}
      renderDayContents={day => driver.format(day, 'ddd')}
      autoFocus
    />
  )));
