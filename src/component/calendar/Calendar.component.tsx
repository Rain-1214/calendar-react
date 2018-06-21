import * as React from "react";
import "./Calendar.component.scss";

import { ICalendarProps, ICalendarStates } from "./Calendar.component.type";
import CalendarDetailBody from "./children/calendar-body/CalendarBody.component";
import CalendarDetailHeader from "./children/calendar-header/CalendarHeader.component";
import { IScheduleList } from "./index.type";

class Calendar extends React.Component<ICalendarProps, ICalendarStates> {

  public static defaultProps = {
    defaultDay: new Date().getDate(),
    defaultMonth: new Date().getMonth() + 1,
    defaultYear: new Date().getFullYear(),
    schedule: [],
    scheduleIconColor: '#f60',
    showSchedule: false,
    showToday: true,
    width: 550,
  }

  public state = {
    day: this.props.defaultDay as number, 
    month: this.props.defaultMonth as number,
    schedule: this.props.schedule as IScheduleList[],
    scheduleIconColor: this.props.scheduleIconColor as string,
    showSchedule: this.props.showSchedule as boolean,
    showToday: this.props.showToday as boolean,
    width: this.props.width as number,
    year: this.props.defaultYear as number,
  }

  public returnToday = () => {
    const today = new Date();
    this.setState({
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    })
  }

  public receiveDateChange = (changeValue: { year: number, month: number, day?: number }) => {
    // tslint:disable-next-line:no-console
    console.log(changeValue)
    switch (true) {
      case !!changeValue.year:
        this.setState({
          year: changeValue.year
        })
      case !!changeValue.month:
        this.setState({
          month: changeValue.month
        })
      case !!changeValue.day:
        this.setState({
          day: changeValue.day as number
        })
    }
  }

  public render () {
    return (
      <div className="calendar-wrapper" style={{width: this.state.width}}>
        <div className="calendar-detail-wrapper">
          <div className="header">
            <CalendarDetailHeader year={this.state.year} month={this.state.month} returnToday={this.returnToday} updateDate={this.receiveDateChange} />
          </div>
          <div className="body">
            <CalendarDetailBody year={this.state.year} month={this.state.month} day={this.state.year}
                                scheduleIconColor={this.state.scheduleIconColor} showSchedule={this.state.showSchedule}
                                updateDate={this.receiveDateChange}/>
          </div>
        </div>
        <div className="schedule-wrapper">
          schedule
        </div>
      </div>
    )
  }
}

export default Calendar;