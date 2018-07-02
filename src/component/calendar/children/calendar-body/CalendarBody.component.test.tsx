import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as sinon from 'sinon';
import { IScheduleList } from '../../index.type';
import CalendarDetailBody from './CalendarBody.component';
import { ICalendarDetailBodyProps, ICalendarDetailBodyStates } from './CalendarBody.component.type';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Calendar Body Component Test', () => {

  let wrapper: Enzyme.ShallowWrapper<ICalendarDetailBodyProps, ICalendarDetailBodyStates>;
  const props: ICalendarDetailBodyProps = {
    year: 2014,
    month: 7,
    day: 15,
    scheduleIconColor: '#ccc',
    showSchedule: false,
    
  }

  const lunarDayNumberToStrData = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
    20: '廿',
    30: '三十',
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<CalendarDetailBody {...props} />);
    (wrapper.instance() as CalendarDetailBody).lunarData = {
      translateDayNumToCalendarStr (day: number): string {
        switch (true) {
          case (day <= 10):
            return '初' + lunarDayNumberToStrData[day];
          case (day < 20):
            return `${lunarDayNumberToStrData[10]}${lunarDayNumberToStrData[day % 10]}`;
          case (day === 20):
            return `${lunarDayNumberToStrData[2]}${lunarDayNumberToStrData[10]}`;
          case (day < 30):
            return `${lunarDayNumberToStrData[20]}${lunarDayNumberToStrData[day % 10]}`;
          case (day === 30):
            return lunarDayNumberToStrData[30];
          default: 
            throw new Error('LunarCalendarData: translateDayNumToCalendarStr: 参数day必须是大于0小于31,当前day: ' + day);
        }
      },
      getLunarMonthAndDay (year: number, month: number, day: number) {
        switch (true) {
          case (year === 2014 && month === 7 && day === 1):
            return {
              month: 6,
              monthStr: '六月',
              day: 5,
              dayStr: '初五',
              currentMonthDaysNum: 30,
              isLeapMonth: false,
              isLeapYear: false,
              chineseEra: {
                heavenlyStems: 0,
                earthlyBranches: 6,
                era: '甲午',
                chineseZodiacAnimal: '马年'
              }
            };
          case (year === 2014 && month === 6 && day === 30):
            return {
              month: 6,
              monthStr: '六月',
              day: 4,
              dayStr: '初四',
              currentMonthDaysNum: 30,
              isLeapMonth: false,
              isLeapYear: false,
              chineseEra: {
                heavenlyStems: 0,
                earthlyBranches: 6,
                era: '甲午',
                chineseZodiacAnimal: '马年'
              }
            };
          case (year === 2014 && month === 7 && day === 27):
            return {
              month: 7,
              monthStr: '七月',
              day: 1,
              dayStr: '初一',
              currentMonthDaysNum: 29,
              isLeapMonth: false,
              isLeapYear: false,
              chineseEra: {
                heavenlyStems: 0,
                earthlyBranches: 6,
                era: '甲午',
                chineseZodiacAnimal: '马年'
              }
            };
          case (year === 2014 && month === 8 && day === 1):
            return {
              month: 7,
              monthStr: '七月',
              day: 6,
              dayStr: '初六',
              currentMonthDaysNum: 29,
              isLeapMonth: false,
              isLeapYear: false,
              chineseEra: {
                heavenlyStems: 0,
                earthlyBranches: 6,
                era: '甲午',
                chineseZodiacAnimal: '马年'
              }
            };
          default:
            return {
              month: 1,
              monthStr: '一月',
              day: 1,
              dayStr: '初一',
              currentMonthDaysNum: 29,
              isLeapMonth: false,
              isLeapYear: false,
              chineseEra: {
                heavenlyStems: 0,
                earthlyBranches: 6,
                era: '甲午',
                chineseZodiacAnimal: '马年'
              }
            };
        }
      },
      getScopeOfLunarYear () {
        return {
          startYear: 1900,
          endYear: 2050
        };
      }
    } as any;
  })

  it('component should have a div with class ".body-wrapper" and have a table in it', () => {
    const bodyWrapperDiv = wrapper.find('.body-wrapper');
    expect(bodyWrapperDiv.length).toBe(1);
    const table = bodyWrapperDiv.find('table');
    expect(table.length).toBe(1);
    const tbody = table.find('tbody');
    expect(tbody.length).toBe(1);
    const trs = tbody.find('tr');
    expect(trs.length).toBe(6);
  })

  it('component should have the table header', () => {
    const headerTr = wrapper.find('tr').first();
    const chineseWeek = ['一', '二', '三', '四', '五', '六', '日'];
    const tds = headerTr.find('th');
    tds.forEach((e, i) => {
      expect(e.text().trim()).toBe(chineseWeek[i]);
    })
  })

  it('component should have the day number and lunar calendar text in the td', () => {
    const firstTd = wrapper.find('tr').at(1).find('td').first();
    const dayWrapperDiv = firstTd.find('.day-wrapper');
    expect(dayWrapperDiv.hasClass('isNotInCurrentMonth')).toBe(true);
    const numberSpan = dayWrapperDiv.find('.number');
    expect(numberSpan.length).toBe(1);
    expect(numberSpan.text().trim()).toBe("30");
    const lunarTextSpan = dayWrapperDiv.find('.lunar-text');
    expect(lunarTextSpan.text().trim()).toBe('初四');
  })

  it('component should have the class "isWeekend" on the ".day-wrapper" div when the day is weekend', () => {
    const dayOf705 = wrapper.find('tr').at(1).find('td').at(5);
    const dayWrapperDiv = dayOf705.find('.day-wrapper');
    expect(dayWrapperDiv.hasClass('isWeekend')).toBe(true);
    const numberSpan = dayWrapperDiv.find('.number');
    expect(numberSpan.length).toBe(1);
    expect(numberSpan.text().trim()).toBe("5");
    const lunarTextSpan = dayWrapperDiv.find('.lunar-text');
    expect(lunarTextSpan.text().trim()).toBe('初九');
  })

  it('component should jump to next lunar month when the day after the last day of prev month last day', () => {
    const dayOf727 = wrapper.find('tr').at(4).find('td').at(6);
    const dayWrapperDiv = dayOf727.find('.day-wrapper');
    const numberSpan = dayWrapperDiv.find('.number');
    expect(numberSpan.length).toBe(1);
    expect(numberSpan.text().trim()).toBe("27");
    const lunarTextSpan = dayWrapperDiv.find('.lunar-text');
    expect(lunarTextSpan.text().trim()).toBe('初一');
  })

  it('component should have the next month day in the calendar', () => {
    const dayOf803 = wrapper.find('tr').at(5).find('td').at(6);
    const dayWrapperDiv = dayOf803.find('.day-wrapper');
    const numberSpan = dayWrapperDiv.find('.number');
    expect(numberSpan.length).toBe(1);
    expect(numberSpan.text().trim()).toBe("3");
    const lunarTextSpan = dayWrapperDiv.find('.lunar-text');
    expect(lunarTextSpan.text().trim()).toBe('初八');
  })

  it('component should have the schedule icon when there are schedule in then "day-wrapper"', () => {
    const schedule: IScheduleList[] = [
      {
        year: 2014,
        month: 7,
        day: 10,
        schedules: [
          {
            startTime: '9:00',
            endTime: '10:00',
            description: '吃饭',
            iconColor: '#ccc'
          }
        ]
      }
    ];
    wrapper.setProps({
      schedules: schedule,
    });
    wrapper.update();
    let dayOf710 = wrapper.find('tr').at(2).find('td').at(3);
    const dayWrapperDiv = dayOf710.find('.day-wrapper');
    const numberSpan = dayWrapperDiv.find('.number');
    expect(numberSpan.length).toBe(1);
    expect(numberSpan.text().trim()).toBe("10");
    const lunarTextSpan = dayWrapperDiv.find('.lunar-text');
    expect(lunarTextSpan.text().trim()).toBe('十四');
    let scheduleIcon = dayWrapperDiv.find('.schedule-icon');
    expect(scheduleIcon.length).toBe(0);

    wrapper.setProps({
      showSchedule: true,
    });
    (wrapper.instance().componentWillMount as () => void)();
    wrapper.update();
    dayOf710 = wrapper.find('tr').at(2).find('td').at(3);
    scheduleIcon = dayOf710.find('.schedule-icon');
    expect(scheduleIcon.length).toBe(1);
    const icon = scheduleIcon.find('i');
    expect(icon.length).toBe(1);
    expect((icon.props().style as React.CSSProperties).backgroundColor).toBe('#ccc');
  })

  it('component should send new date to parent component when some td was clicked', () => {
    const updateDateSpy = sinon.fake();
    wrapper.setProps({
      updateDate: updateDateSpy
    })
    const dayOf705 = wrapper.find('tr').at(1).find('td').at(5);
    dayOf705.simulate('click');
    expect(updateDateSpy.calledWith({ year: 2014, month: 7, day: 5 })).toBe(true);
  })

  it('component should update the "year" an "month" of property when the props changed', () => {
    let instance = wrapper.instance() as CalendarDetailBody;
    expect(instance.year).toBe(2014);
    expect(instance.month).toBe(7);
    wrapper.setProps({
      year: 1950,
      month: 9
    });
    instance = wrapper.instance() as CalendarDetailBody
    expect(instance.year).toBe(1950);
    expect(instance.month).toBe(9);
  })

})