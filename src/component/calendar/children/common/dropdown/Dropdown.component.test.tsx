import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as jsdom from 'jsdom';
import * as React from 'react';
import * as sinon from 'sinon';
import { IListData } from '../../../index.type';
import MinScroll from '../minscroll/MinScroll.component';
import Dropdown from './Dropdown.component';
import { IDropdownProps, IDropdownStates } from './Dropdown.component.type';

if (document === undefined) {
  const dom = new jsdom.JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
  window = dom.window;
  document = window.document
}

Enzyme.configure({
  adapter: new Adapter()
});

describe('Dropdown component test', () => {

  let wrapper: Enzyme.ReactWrapper<IDropdownProps, IDropdownStates>;
  const listData: IListData[] = [];
  let i = 0;
  while(i <= 10) {
    listData.push({
      label: `test${i}`,
      value: i
    })
    i++;
  };
  const eventDefaultData = {
    // tslint:disable-next-line:no-empty
    stopPropagation() {},
    nativeEvent: {
      // tslint:disable-next-line:no-empty
      stopImmediatePropagation() {}
    }
  };

  beforeEach(() => {
    wrapper = Enzyme.mount(<Dropdown listData={listData} />)
  })

  it('component should have a div with class ".dropdown-wrapper" and set width', () => {
    let dropdownWrapper = wrapper.find('.dropdown-wrapper');
    expect(dropdownWrapper.length).toBe(1);
    expect((dropdownWrapper.props().style as React.CSSProperties).width).toBe(80);
    wrapper.setProps({
      width: 200
    })
    dropdownWrapper = wrapper.find('.dropdown-wrapper');
    expect((dropdownWrapper.props().style as React.CSSProperties).width).toBe(200);
  })

  it('component should haive "dropdown-btn" and "value" in "dropdown-wrapper"', () => {
    const dropdownBtn = wrapper.find('.dropdown-btn');
    expect(dropdownBtn.length).toBe(1);
    const dropdownBtnIcon = dropdownBtn.find('.icon-down');
    expect(dropdownBtnIcon.length).toBe(1);
    let value = wrapper.find('.value');
    expect(value.length).toBe(1);
    expect(value.text().trim()).toBe('待选择');
    wrapper.setProps({
      value: 'test-1'
    });
    value = wrapper.find('.value');
    expect(value.text().trim()).toBe('test-1');
  })

  it('component should have a div with "dropdown-list" and should have data list in it', () => {
    const dropdownList = wrapper.find('.dropdown-list');
    expect(dropdownList.length).toBe(1);
    expect(dropdownList.props().hidden).toBe(true);
    const listUl = dropdownList.find('ul');
    expect(listUl.length).toBe(1);
    const listLis = listUl.find('li');
    expect(listLis.length).toBe(listData.length);
    for (let j = 0; j < listData.length; j++) {
      expect(listLis.at(j).text().trim()).toBe(listData[j].label)
    }
  })

  it('componet should show "dropdown-list" when "dropdown-btn" or "value" clicked', () => {
    wrapper.setProps({
      maxHeight: 200
    });
    let dropdownList = wrapper.find('.dropdown-list');
    expect(dropdownList.props().hidden).toBe(true);

    const valueDiv = wrapper.find('.value');
    const dropdownBtn = wrapper.find('.dropdown-btn');
    const minscrollInstance = (wrapper.instance() as Dropdown).minScrollComponentRef.current as MinScroll;
    minscrollInstance.sourceHeight = 24 * 11;
    minscrollInstance.maxScrollBarDistance = 170;
    minscrollInstance.maxScrollElementDistance = 24 * 11 - 200;
    valueDiv.simulate('click', eventDefaultData);
    wrapper.update();
    dropdownList = wrapper.find('.dropdown-list');
    expect(dropdownList.props().hidden).toBe(false);
    const scrollElement = wrapper.find('.scroll-element');
    const scrollBar = wrapper.find('.bar');
    expect((scrollElement.props().style as React.CSSProperties).top).toBe(-0);
    expect((scrollBar.props().style as React.CSSProperties).top).toBe(0);

    dropdownBtn.simulate('click', eventDefaultData);
    dropdownList = wrapper.find('.dropdown-list');
    expect(dropdownList.props().hidden).toBe(true);

  })

  it('component should set state of "value" and send value to parent component when li clicked,if props pass "updateDate" function', () => {
    const updateDateSyp = sinon.fake();
    wrapper.setProps({
      updateValue: updateDateSyp
    })
    const lis = wrapper.find('li');
    lis.at(0).simulate('click', eventDefaultData);
    let state = wrapper.state();
    expect(state.value).toBe(listData[0].value);
    expect(updateDateSyp.calledWith(listData[0].value)).toBe(true);

    lis.at(5).simulate('click', eventDefaultData);
    state = wrapper.state();
    expect(state.value).toBe(listData[5].value);
    expect(updateDateSyp.calledWith(listData[5].value)).toBe(true);

  })

  it('component set state of "value" when "value" of props changes', () => {
    let states = wrapper.state();
    expect(states.value).toBe('待选择');
    wrapper.setProps({
      value: 'test-12'
    })
    states = wrapper.state();
    expect(states.value).toBe('test-12');
  })
  
  it('component should close data list when document is clicked and "globalClickClose" of props is true', () => {
    wrapper.setProps({
      maxHeight: 200,
      globalClickClose: true
    });
    const minscrollInstance = (wrapper.instance() as Dropdown).minScrollComponentRef.current as MinScroll;
    minscrollInstance.sourceHeight = 24 * 11;
    minscrollInstance.maxScrollBarDistance = 170;
    minscrollInstance.maxScrollElementDistance = 24 * 11 - 200;

    const value = wrapper.find('.value');
    value.simulate('click', eventDefaultData);
    let dropdownList = wrapper.find('.dropdown-list');
    expect(dropdownList.props().hidden).toBe(false);
  
    document.dispatchEvent(new MouseEvent('mousedown'));
    document.dispatchEvent(new MouseEvent('mouseup'));
    wrapper.update();
    dropdownList = wrapper.find('.dropdown-list');
    expect(dropdownList.props().hidden).toBe(true);
  })

})