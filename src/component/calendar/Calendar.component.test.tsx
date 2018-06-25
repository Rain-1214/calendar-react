
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import Calendar from './Calendar.component';
import { ICalendarProps, ICalendarStates } from './Calendar.component.type';
import { IScheduleList } from './index.type';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Calendar Component Tests', () => {

  let wrapper: Enzyme.ShallowWrapper<ICalendarProps, ICalendarStates>;
  
  beforeEach(() => {
    wrapper = Enzyme.shallow(<Calendar />);
  });

  it('component should have a div with class ".calendar-wrapper"', () => {
    const calendarWrapperDiv = wrapper.find('.calendar-wrapper');
    expect(calendarWrapperDiv.length).toBe(1);
    expect((calendarWrapperDiv.props().style as React.CSSProperties).width).toBe(550);
    wrapper = Enzyme.shallow(<Calendar width={800} />)
    const afterChangeWidthDiv = wrapper.find('.calendar-wrapper');
    expect((afterChangeWidthDiv.props().style as React.CSSProperties).width).toBe(800);
  });

  it('component should have ".calendar-detail-wrapper" and ".schedule-wrapper" div in ".calendar-wrapper"', () => {
    const calendarWrapperDiv = wrapper.find('.calendar-wrapper');
    expect(calendarWrapperDiv.length).toBe(1);
    const calendarDetailWrapperDiv = calendarWrapperDiv.find('.calendar-detail-wrapper');
    expect(calendarDetailWrapperDiv.length).toBe(1);
    const scheduleWrapperDiv = calendarWrapperDiv.find('.schedule-wrapper');
    expect(scheduleWrapperDiv.length).toBe(1);
  });

  it('component should have ".header" div and ".body" div in ".calendar-detail-wrapper"', () => {
    const calendarDetailWrapperDiv = wrapper.find('.calendar-detail-wrapper');
    const headerDiv = calendarDetailWrapperDiv.find('.header');
    expect(headerDiv.length).toBe(1);
    const bodyDiv = calendarDetailWrapperDiv.find('.body');
    expect(bodyDiv.length).toBe(1);
  });

  it('there are children component in ".header",".body" and ".schedule-wrapper"', () => {
    const headerDiv = wrapper.find('.header');
    expect(headerDiv.children.length).toBe(1);
    expect(headerDiv.children().at(0).name()).toBe('CalendarDetailHeader');

    const bodyDiv = wrapper.find('.body');
    expect(bodyDiv.children.length).toBe(1);
    expect(bodyDiv.children().at(0).name()).toBe('CalendarDetailBody');

    const scheduleWrapper = wrapper.find('.schedule-wrapper');
    expect(scheduleWrapper.children.length).toBe(1);
    expect(scheduleWrapper.children().at(0).name()).toBe('Schedule');
  });

  it('component should init default props when creared it', () => {
    const schedule: IScheduleList[] = [
      {
        day: 2,
        month: 6,
        schedules: [
          {
            description: '吃饭',
            endTime: '11:00',
            iconColor: '#000',
            startTime: '10:00',
          }
        ],
        year: 1929,
      }
    ]
    wrapper = Enzyme.shallow(
      <Calendar width={800} showToday={false} showSchedule={true} scheduleIconColor="#ccc"
                schedule={schedule} defaultYear={1999} defaultMonth={8} defaultDay={12} />
    )
    const state = wrapper.state();
    expect(state).toEqual({
      day: 12,
      month: 8,
      schedule,
      scheduleIconColor: '#ccc',
      showSchedule: true,
      showToday: false,
      width: 800,
      year: 1999,
    })
  });

  it('component should set state of "day","month" and "year" to today when method of "returnToday" called', () => {
    const instance: Calendar = wrapper.instance() as Calendar;
    wrapper.setState({
      day: 10,
      month: 2,
      year: 1999
    });
    let state = wrapper.state();
    expect(state.day).toBe(10);
    expect(state.month).toBe(2);
    expect(state.year).toBe(1999);
    instance.returnToday();
    wrapper.update();
    state = wrapper.state();
    const today = new Date();
    expect(state.day).toBe(today.getDate());
    expect(state.month).toBe(today.getMonth() + 1);
    expect(state.year).toBe(today.getFullYear());
  });

  it('component send "year","month" and "day" to parent by the method of "props" updateDate when them changed', () => {
    const updateDateSpy = jest.spyOn();
  });

});
