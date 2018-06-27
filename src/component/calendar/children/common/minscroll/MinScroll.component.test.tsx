
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import MinScroll from './MinScroll.component';
import { IMinScrollProps, IMinScrollStates } from './MinScroll.component.type';

Enzyme.configure({
  adapter: new Adapter()
});

describe('MinScroll component test', () => {

  let wrapper: Enzyme.ReactWrapper<IMinScrollProps, IMinScrollStates>;

  beforeEach(() => {
    wrapper = Enzyme.mount(<MinScroll />)
  });

  it('component should have div with class ".min-scroll-bar-wrapper" and maybe have class "hasScroll"', () => {
    const wrapperDiv = wrapper.find('.min-scroll-bar-wrapper');
    expect(wrapperDiv.length).toBe(1);
    expect(wrapperDiv.hasClass('hasScroll')).toBe(false);
    (wrapper.instance() as MinScroll).sourceHeight = 1500;
    wrapper.setProps({
      maxHeight: 200
    });
    wrapper.update();
    const afterChangeWrapperDiv = wrapper.find('.min-scroll-bar-wrapper');
    expect(afterChangeWrapperDiv.hasClass('hasScroll')).toBe(true);

  });

  it('component should have ".scroll-wrapper" and ".scroll-element" in ".min-scroll-bar-wrapper"', () => {
    const wrapperDiv = wrapper.find('.min-scroll-bar-wrapper');
    const scrollWrapperDiv = wrapperDiv.find('.scroll-wrapper');
    expect(scrollWrapperDiv.length).toBe(1);
    expect((scrollWrapperDiv.props().style as React.CSSProperties).maxHeight).toBe(Number.MAX_SAFE_INTEGER);
    const scrollElementDiv = wrapperDiv.find('.scroll-element');
    expect(scrollElementDiv.length).toBe(1);
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(0);
    wrapper.setProps({
      maxHeight: 200
    })
    const afterChangeScrollWrapper = wrapper.find('.scroll-wrapper');
    expect((afterChangeScrollWrapper.props().style as React.CSSProperties).maxHeight).toBe(200);
  });

  it('component should have ".scroll-bar" and ".bar" in ".min-scroll-bar-wrapper"', () => {
    const wrapperDiv = wrapper.find('.min-scroll-bar-wrapper');
    const scrollBar = wrapperDiv.find('.scroll-bar');
    expect(scrollBar.length).toBe(1);
    const bar = scrollBar.find('.bar');
    expect(bar.length).toBe(1);
    expect((bar.props().style as React.CSSProperties).top).toBe(0);
  });

  it('component should set scroll distance when mouseWheel event called on ".min-scroll-bar-wrapper"', () => {
    wrapper.setProps({
      maxHeight: 200
    });
    (wrapper.instance() as MinScroll).sourceHeight = 1500;
    (wrapper.instance() as MinScroll).maxScrollBarDistance = 170;
    (wrapper.instance() as MinScroll).maxScrollElementDistance = 1300;
    const scrollStep = 50;
    const wrapperDiv = wrapper.find('.min-scroll-bar-wrapper');
    wrapperDiv.simulate('wheel',{ deltaY: 10 });
    let scrollElementDiv = wrapper.find('.scroll-element');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-scrollStep);
    wrapperDiv.simulate('wheel',{ deltaY: 10 });
    scrollElementDiv = wrapper.find('.scroll-element');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-scrollStep * 2);
    wrapperDiv.simulate('wheel',{ deltaY: -10 });
    wrapperDiv.simulate('wheel',{ deltaY: -10 });
    wrapperDiv.simulate('wheel',{ deltaY: -10 });
    wrapperDiv.simulate('wheel',{ deltaY: -10 });
    scrollElementDiv = wrapper.find('.scroll-element');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(0);
    for(let i = 0; i < 1300 / scrollStep; i ++) {
      wrapperDiv.simulate('wheel',{ deltaY: 10 });
    }
    scrollElementDiv = wrapper.find('.scroll-element');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-1300);
    wrapperDiv.simulate('wheel',{ deltaY: 10 });
    wrapperDiv.simulate('wheel',{ deltaY: 10 });
    scrollElementDiv = wrapper.find('.scroll-element');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-1300);
  });


  it('component should set scroll distance when click the "scroll-bar"', () => {
    wrapper.setProps({
      maxHeight: 200
    });
    (wrapper.instance() as MinScroll).sourceHeight = 1500;
    (wrapper.instance() as MinScroll).maxScrollBarDistance = 170;
    (wrapper.instance() as MinScroll).maxScrollElementDistance = 1300;
    const scrollBar = wrapper.find('.scroll-bar');
    scrollBar.simulate('click', { nativeEvent: { offsetY: 100 } });
    let scrollElementDiv = wrapper.find('.scroll-element');
    let bar = wrapper.find('.bar');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-((100 - 15) / 170 * 1300));
    expect((bar.props().style as React.CSSProperties).top).toBe(85);
    scrollBar.simulate('click', { nativeEvent: { offsetY: 0 } });
    scrollElementDiv = wrapper.find('.scroll-element');
    bar = wrapper.find('.bar');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-0);
    expect((bar.props().style as React.CSSProperties).top).toBe(0);
    scrollBar.simulate('click', { nativeEvent: { offsetY: 200 } });
    scrollElementDiv = wrapper.find('.scroll-element');
    bar = wrapper.find('.bar');
    expect((scrollElementDiv.props().style as React.CSSProperties).top).toBe(-1300);
    expect((bar.props().style as React.CSSProperties).top).toBe(170);
  });


  it('component should set scroll distance when drag the "bar"', () => {
    wrapper.setProps({
      maxHeight: 200
    });
    (wrapper.instance() as MinScroll).sourceHeight = 1500;
    (wrapper.instance() as MinScroll).maxScrollBarDistance = 170;
    (wrapper.instance() as MinScroll).maxScrollElementDistance = 1300;
    
  });
});