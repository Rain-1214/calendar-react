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

  beforeEach(() => {
    wrapper = Enzyme.shallow(<CalendarDetailHeader returnToday={returnTodaySpy} />);
    (wrapper.instance() as CalendarDetailHeader).lunarCalendar = {
      getScopeOfLunarYear() {
        return {
          startYear: 1900,
          endYear: 2050
        }
      }
    } as any;
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
    const today = new Date();
    const btn = wrapper.find('.prev').first();
    const updateDateSpy = sinon.fake();
    wrapper.setProps({
      updateDate: updateDateSpy
    })
    btn.simulate('click');
    if (wrapper.state().month !== 1) {
      expect(wrapper.state().month).toBe(today.getMonth());
      expect(updateDateSpy.calledWith({ year: today.getFullYear(), month: today.getMonth() })).toBe(true);
    } else {
      expect(wrapper.state().month).toBe(12);
      expect(wrapper.state().year).toBe(today.getFullYear() - 1);
    }
    wrapper.setState({
      month: 1,
      year: 1950
    })
    wrapper.update();
    btn.simulate('click');
    expect(wrapper.state().month).toBe(12);
    expect(wrapper.state().year).toBe(1949);
    expect(updateDateSpy.calledWith({ year: 1949, month: 12 })).toBe(true);
    wrapper.setState({
      year: 1900,
      month: 1
    })
    wrapper.update();
    btn.simulate('click');
    expect(wrapper.state().month).toBe(1);
    expect(wrapper.state().year).toBe(1900);
  })

  it('component should set next month when ".next" clicked', () => {
    const today = new Date();
    const btn = wrapper.find('.next').first();
    const updateDateSpy = sinon.fake();
    wrapper.setProps({
      updateDate: updateDateSpy
    })
    btn.simulate('click');
    if (wrapper.state().month !== 12) {
      expect(wrapper.state().month).toBe(today.getMonth() + 2);
      expect(updateDateSpy.calledWith({ year: today.getFullYear(), month: today.getMonth() + 2 })).toBe(true);
    } else {
      expect(wrapper.state().month).toBe(1);
      expect(wrapper.state().year).toBe(today.getFullYear() + 1);
    }
    wrapper.setState({
      month: 12,
      year: 1950
    });
    wrapper.update();
    btn.simulate('click');
    expect(wrapper.state().month).toBe(1);
    expect(wrapper.state().year).toBe(1951);
    expect(updateDateSpy.calledWith({ year: 1951, month: 1 })).toBe(true);
    wrapper.setState({
      month: 12,
      year: 2050
    })
    btn.simulate('click');
    expect(wrapper.state().year).toBe(2050);
    expect(wrapper.state().month).toBe(12);
  })

  it('component should have a year dropdown component in the first div of ".calendar-header"', () => {
    const updateDateSpy = sinon.fake();
    wrapper.setProps({
      updateDate: updateDateSpy
    })
    const dropdown = wrapper.find('.calendar-header>div').first().find('Dropdown');
    expect(wrapper.state().year).toBe(new Date().getFullYear());
    (dropdown.props() as any).updateValue(1950, 'year');
    expect(wrapper.state().year).toBe(1950);
    expect(updateDateSpy.calledWith({ year: 1950, month: wrapper.state().month }));
  })

  it('component should have a month dropdown component in the second div of ".calendar-header"', () => {
    const today = new Date();
    const updateDateSpy = sinon.fake();
    wrapper.setProps({
      updateDate: updateDateSpy
    })
    const dropdown = wrapper.find('.calendar-header>div').at(1).find('Dropdown');
    expect(dropdown.length).toBe(1);
    expect(wrapper.state().month).toBe(today.getMonth() + 1);
    (dropdown.props() as any).updateValue(6, 'month');
    expect(wrapper.state().month).toBe(6);
    expect(updateDateSpy.calledWith({ year: today.getFullYear(), month: 6 }));
  });

  it('component should set "year" or "month" of state when "year" or "month" of props change', () => {
    const today = new Date();
    let state = wrapper.state();
    expect(state.month).toBe(today.getMonth() + 1);
    expect(state.year).toBe(today.getFullYear());
    wrapper.setProps({
      year: 1950,
      month: 1
    });
    state = wrapper.state();
    expect(state.month).toBe(1);
    expect(state.year).toBe(1950);
  })

})