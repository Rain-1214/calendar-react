import * as React from "react";
import { IListData } from "../../index.type";
import Dropdown from "../common/dropdown/Dropdown.component";

class CalendarDetailHeader extends React.Component {

  public yearListData: IListData[] = [];

  public state = {
    day: null,
    month: null,
    year: null,
  }

  public componentDidMount() {
    for (let i = 1900; i <= 2050; i++) {
      this.yearListData.push({
        label: `${i}年`,
        value: `${i}`
      });
    }
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

  public render () {
    return (
      <div className="calendar-header">
        <div>
          <Dropdown listData={this.yearListData}
                    maxHeight={200}
                    updateValue={this.resceiveDate.bind(this, 'year')} />
        </div>
      </div>
    )
  }
}

export default CalendarDetailHeader;