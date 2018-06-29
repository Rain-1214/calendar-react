import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as sinon from 'sinon';
import CalendarDetailHeader from './CalendarHeader.component';
import { ICalendarDetailHeaderProps, ICalendarDetailHeaderStates } from './CalendarHeader.component.type';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Calendar Detail Header Component test', () => {

  let wrapper: Enzyme.ShallowWrapper<ICalendarDetailHeaderProps, ICalendarDetailHeaderStates>;
  const returnTodaySpy = sinon.fake();
  CalendarDetailHeader.prototype.lunarCalendar = {
    getScopeOfLunarYear() {
      return {
        startYear: 1900,
        endYear: 2050
      }
    }
  } as any;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<CalendarDetailHeader returnToday={returnTodaySpy} />)
  })

  it('component should have a div with "calendar-header" and have three div in it', () => {
    const calendarHeaderDiv = wrapper.find('.calendar-header');
    expect(calendarHeaderDiv.length).toBe(1);
    expect(calendarHeaderDiv.children().length).toBe(3);
  })

  it('component should have a "prev" div and "next" div in the second div', () => {
    const divs = wrapper.find('.calendar-header>div');
    const secondDiv = divs.at(1);
    const prevBtn = secondDiv.find('.prev');
    expect(prevBtn.length).toBe(1);
    expect(prevBtn.hasClass('icon')).toBe(true);
    const nextBtn = secondDiv.find('.next');
    expect(nextBtn.length).toBe(1);
    expect(nextBtn.hasClass('icon')).toBe(true);
  })

  it('component should set prev month when ".prev" clicked', () => {
    wrapper.update();
    const btn = wrapper.find('.prev').first();
    // tslint:disable-next-line:no-console
    console.log(wrapper.state())
    btn.simulate('click');
    wrapper = wrapper.update();
    // tslint:disable-next-line:no-console
    console.log(wrapper.state())
  })

})