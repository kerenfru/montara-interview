import React from 'react';
import {msToDays, getDatePlus14Days} from './utils';
// import renderer from 'react-test-renderer';

test('validate conversion from mili to days', () => {
    let day = msToDays(100000000);
    expect(day).toBe(1);
    day = msToDays(10000000000);
    expect(day).toBe(115);
    day = msToDays(-10000000000);
    expect(day).toBe(-116);
    day = msToDays(0);
    expect(day).toBe(0);
});

test('validate date plus 14 days', () => {
    let day = getDatePlus14Days('Sun Aug 09 2020 21:23:54 GMT+0300');
    expect(day).toMatchObject(new Date('2020-08-23T18:23:54.000Z'));
});