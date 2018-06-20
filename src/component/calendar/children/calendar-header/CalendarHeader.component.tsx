import * as React from "react";
import { IListData } from "../../index.type";
import Dropdown from "../common/dropdown/Dropdown.component";
import { ICalendarDetailHeaderProps, ICalendarDetailHeaderStates } from "./CalendarHeader.component.type";

import LunarCalendarDataService from "../../../../tool/LunarCalendar";
import './CalendarHeader.component.scss';

class CalendarDetailHeader extends React.Component<ICalendarDetailHeaderProps, ICalendarDetailHeaderStates> {

  public static defaultProps = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }

  public yearListData: IListData[] = [];
  public monthListData: IListData[] = [];
  public lunarCalendar = LunarCalendarDataService.getInstance();

  public state = {
    month: 0,
    year: 0,
  }

  public componentDidMount() {
    this.setState({
      month: this.props.month as number,
      year: this.props.year as number,
    })
    const { startYear, endYear } = this.lunarCalendar.getScopeOfLunarYear();
    for (let i = startYear; i <= endYear; i++) {
      this.yearListData.push({
        label: `${i}年`,
        value: i
      });
    }
    for (let i = 1; i <= 12; i++) {
      this.monthListData.push({
        label: `${i}月`,
        value: i
      })
    }
  }

  public resceiveDate = (value: number, selectValue: 'month' | 'year') => {
    switch(selectValue) {
      case 'year':
        this.setState({
          year: value
        });
        break;
      case 'month':
        this.setState({
          month: value
        });
        break;
    }
  }

  public jump2nextMonth = () => {
    const { endYear } = this.lunarCalendar.getScopeOfLunarYear();
    if (this.state.year === endYear && this.state.month === 12) {
      return;
    }
    if (this.state.month === 12) {
      this.setState({
        month: 1,
        year: this.state.year + 1,
      })
    } else {
      this.setState({
        month: this.state.month + 1
      })
    }
    if (this.props.updateDate) {
      this.props.updateDate({ year: this.state.year + 1, month: this.state.month + 1})
    }
  }

  public jump2PrevMonth = () => {
    const { startYear } = this.lunarCalendar.getScopeOfLunarYear();
    if (this.state.year === startYear && this.state.month === 1) {
      return;
    }
    if (this.state.month === 1) {
      this.setState({
        month: 12,
        year: this.state.year - 1
      })
    } else {
      this.setState({
        month: this.state.month - 1
      })
    }
    if (this.props.updateDate) {
      this.props.updateDate({ year: this.state.year + 1, month: this.state.month + 1})
    }
  }
  
  public render () {
    return (
      <div className="calendar-header">
        <div>
          <Dropdown listData={this.yearListData}
                    maxHeight={200}
                    placeholder="年"
                    value={this.state.year}
                    updateValue={this.resceiveDate.bind(this, 'year')} />
        </div>
        <div>
          <div className="icon prev" onClick={this.jump2PrevMonth} />
          <Dropdown listData={this.monthListData}
                    maxHeight={200}
                    placeholder="月"
                    value={this.state.month}
                    updateValue={this.resceiveDate.bind(this, 'month')} />
          <div className="icon next" onClick={this.jump2nextMonth} />
        </div>
        <div>
          <button className="btn" onClick={this.props.returnToday}>返回今日</button>
        </div>
      </div>
    )
  }
}

export default CalendarDetailHeader;