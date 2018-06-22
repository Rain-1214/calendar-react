
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import Calendar from './Calendar.component';

describe('Calendar Component Tests', () => {

  let wrapper: any;
  
  beforeEach(() => {
    wrapper = shallow(<Calendar />);
  });

  it('component should have a div with class ".calendar-wrapper"', () => {
    // tslint:disable-next-line:no-console
    console.log(wrapper);
  });

});
