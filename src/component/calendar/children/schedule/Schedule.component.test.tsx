import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { IScheduleList } from '../../index.type';
import Schedule from './Schedule.component';
import { IScheduleProps, IScheduleStates } from './Schedule.component.type';

Enzyme.configure({ adapter: new Adapter() });

describe('Schedule Component test', () => {

  let wrapper: Enzyme.ShallowWrapper<IScheduleProps, IScheduleStates>;
  const props: IScheduleProps = {
    day: 5,
    month: 6,
    schedule: [],
    year: 2018,
  }
  const lunarDate = {
    month: 4,
    monthStr: '四月',
    day: 22,
    dayStr: '廿二',
    currentMonthDaysNum: 30,
    isLeapMonth: false,
    isLeapYear: false,
    chineseEra: {
      heavenlyStems: 4,
      earthlyBranches: 10,
      era: '戊戌',
      chineseZodiacAnimal: '狗'
    }
  }

  beforeEach(() => {
    wrapper = Enzyme.shallow(<Schedule {...props} />);
    (wrapper.instance() as Schedule).lunarData = {
      getLunarMonthAndDay () {
        return lunarDate;
      },
    } as any;
  })

  it('component shoule have a div with class ".schedule", then there are ".header" div and ".list" div in it', () => {
    const scheduleDiv = wrapper.find('.schedule');
    expect(scheduleDiv.length).toBe(1);
    const headerDiv = scheduleDiv.find('.header');
    expect(headerDiv.length).toBe(1);
    const listDiv = scheduleDiv.find('.list');
    expect(listDiv.length).toBe(1);
  });

  it('component should init the state of "currentDate" and "lunarData"', () => {
    const state = wrapper.state();
    expect(state.lunarData).toEqual(lunarDate);
    expect(state.currentDate).toEqual(new Date(2018, 5, 5));
  })

  it('component should show the detail message of "currentDate"', () => {
    const headerDiv = wrapper.find('.header');
    const fisrtDiv = headerDiv.childAt(0);
    expect(fisrtDiv.text().trim()).toBe('2018-6-5 星期二');
    const secondDiv = headerDiv.childAt(1);
    expect(secondDiv.hasClass('day')).toBe(true);
    expect(secondDiv.text().trim()).toBe('5');
    const thirdDiv = headerDiv.childAt(2);
    expect(thirdDiv.text().trim()).toBe('戊戌年 狗年');
    const forthDiv = headerDiv.childAt(3);
    expect(forthDiv.text().trim()).toBe('四月廿二');
    wrapper.setState({
      lunarData: {
        ...lunarDate,
        isLeapMonth: true
      }
    })
    wrapper.update();
    const afterChangeForthDiv = wrapper.find('.header').childAt(3);
    expect(afterChangeForthDiv.text().trim()).toBe('闰四月廿二');
  })

  it('component show schedule list in ".list" div or show ".empty" li when schedule is empty', () => {
    const listDiv = wrapper.find('.list');
    const titleDiv = listDiv.find('.title');
    expect(titleDiv.text().trim()).toBe('今日日程');
    const listUl = listDiv.find('ul');
    expect(listUl.length).toBe(1);
    const emptyLi = listUl.childAt(0);
    expect(emptyLi.hasClass('empty')).toBe(true);
    expect(emptyLi.text().trim()).toBe('暂无日程');
    const schedule: IScheduleList[] = [
      {
        day: 5,
        month: 6,
        schedules: [
          {
            startTime: '9:00',
            endTime: '10:00',
            description: '吃饭',
            iconColor: '#ccc'
          },
          {
            startTime: '9:00',
            endTime: '10:00',
            description: '睡觉',
            iconColor: '#ccc'
          }
        ],
        year: 2018,
      }
    ]
    wrapper.setProps({
      schedule,
    })
    const afterChangeListLi = wrapper.find('.list ul li');
    expect(afterChangeListLi.length).toBe(2);
    afterChangeListLi.forEach((e, i) => {
      const tempScheduleList = schedule[0].schedules[i];
      const timeDiv = e.find('.time');
      expect(timeDiv.length).toBe(1);
      expect(timeDiv.text().trim()).toBe(`${tempScheduleList.startTime} - ${tempScheduleList.endTime}`);
      const iconI = e.find('i');
      expect(iconI.hasClass('icon')).toBe(true);
      expect((iconI.props().style as React.CSSProperties).backgroundColor).toBe(tempScheduleList.iconColor);
      const descriptionDiv = e.find('.description');
      expect(descriptionDiv.length).toBe(1);
      expect(descriptionDiv.text().trim()).toBe(tempScheduleList.description);
    })
    
  })

});