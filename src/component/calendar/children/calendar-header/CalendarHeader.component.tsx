import * as React from "react";
import Dropdown from "../common/dropdown/Dropdown.component";

class CalendarDetailHeader extends React.Component {

  public state = {
    day: null,
    month: null,
    year: null,
    yearListData: [{
      label: '123',
      value: '123'
    }]
  }

  public componentDidMount() {
    const tempArray = [];
    for (let i = 1900; i <= 2050; i++) {
      tempArray.push({
        label: `${i}年`,
        value: `${i}`
      });
    }
    this.setState({
      yearListData: tempArray
    })
  }

  public resceiveDate = (value: string, selectValue: 'month' | 'year') => {
    switch(value) {
      case 'year':
        this.setState({
          year: selectValue
        });
        break;
      case 'month':
        this.setState({
          month: selectValue
        });
        break;
    }
  }

  public testAdd = () => {
    const tempArray = this.state.yearListData;
    tempArray.push({
      label: '100year',
      value: '100',
    })
    this.setState({
      yearListData: tempArray
    })
  }

  public b = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  public render () {
    return (
      <div className="calendar-header">
        <div>
          <Dropdown listData={this.state.yearListData}
                    maxHeight={200}
                    updateValue={this.resceiveDate.bind(this, 'year')} />
        </div>
        <div>
          <button onClick={this.testAdd} onMouseDown={this.b}>add</button>
        </div>
      </div>
    )
  }
}

export default CalendarDetailHeader;