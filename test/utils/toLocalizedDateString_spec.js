// TODO: handle moment legacy
/* eslint-disable */

import { expect } from 'chai';
import moment from 'moment';

import toLocalizedDateString from '../../src/utils/toLocalizedDateString';

import { setDriver } from '../../src/drivers/driver';
import momentDriver from '../../src/drivers/moment/driver';
import { ISO_FORMAT } from '../../src/drivers/moment/constants';

describe('toLocalizedDateString', () => {
  beforeEach(() => {
    setDriver(momentDriver);
  });

  it('returns null for falsy argument', () => {
    expect(toLocalizedDateString()).to.equal(null);
  });

  it('converts moment object to localized date string', () => {
    const testDate = moment('1991-07-13');
    const dateString = toLocalizedDateString(testDate);
    expect(dateString).to.equal(testDate.format('L'));
  });

  it('converts iso date string to localized date string', () => {
    const testDate = moment('1991-07-13');
    const dateString = toLocalizedDateString(testDate.format(ISO_FORMAT));
    expect(dateString).to.equal(testDate.format('L'));
  });

  it('localized date strings stay the same', () => {
    const testDate = moment('1991-07-13');
    const dateString = toLocalizedDateString(testDate.format('L'));
    expect(dateString).to.equal(testDate.format('L'));
  });

  it('converts custom format date strings with format passed in', () => {
    const testDate = moment('1991-07-13');
    const dateString = toLocalizedDateString(testDate.format('YYYY---DD/MM'), 'YYYY---DD/MM');
    expect(dateString).to.equal(testDate.format('L'));
  });
});
