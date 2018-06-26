
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import MinScroll from './MinScroll.component';
import { IMinScrollProps, IMinScrollStates } from './MinScroll.component.type';

Enzyme.configure({
  adapter: new Adapter()
});

describe('MinScroll component test', () => {

  let wrapper: Enzyme.ShallowWrapper<IMinScrollProps, IMinScrollStates>;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<MinScroll />)
  });

  it('component should have div with class ".min-scroll-bar-wrapper" and maybe have class "hasScroll"', () => {
    const wrapperDiv = wrapper.find('.min-scroll-bar-wrapper');
    expect(wrapperDiv.length).toBe(1);
    expect(wrapperDiv.hasClass('hasScroll')).toBe(false);
    ((wrapper.instance() as MinScroll).scrollWrapperRef.current as HTMLElement).style.height = '1500px';
    wrapper.setProps({
      maxHeight: 200
    });
    expect(wrapperDiv.hasClass('hasScroll')).toBe(true);

  });

});