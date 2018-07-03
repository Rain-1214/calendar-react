import * as React from "react";
import "./Calendar.component.scss";

import { ICalendarProps, ICalendarStates } from "./Calendar.component.type";
import CalendarDetailBody from "./children/calendar-body/CalendarBody.component";
import CalendarDetailHeader from "./children/calendar-header/CalendarHeader.component";
import Schedule from "./children/schedule/Schedule.component";
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

  // public componentWillMount () {
  //   // const schedule: IScheduleList[] = [
  //   //   {
  //   //     day: 22,
  //   //     month: 6,
  //   //     schedules: [
  //   //       {
  //   //         description: '吃饭',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       }
  //   //     ],
  //   //     year: 2018,
  //   //   },
  //   //   {
  //   //     day: 12,
  //   //     month: 6,
  //   //     schedules: [
  //   //       {
  //   //         description: '吃饭1',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉1',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       }
  //   //     ],
  //   //     year: 2018,
  //   //   },
  //   //   {
  //   //     day: 5,
  //   //     month: 6,
  //   //     schedules: [
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '吃饭2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //       {
  //   //         description: '睡觉2',
  //   //         endTime: '10:00',
  //   //         iconColor: '#ff0000',
  //   //         startTime: '9:00',
  //   //       },
  //   //     ],
  //   //     year: 2018,
  //   //   }
  //   // ];
  //   // this.setState({
  //   //   schedule,
  //   //   showSchedule: true
  //   // })
  // }

  public returnToday = () => {
    const today = new Date();
    this.setState({
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear()
    })
  }

  public receiveDateChange = (changeValue: { year: number, month: number, day?: number }) => {
    switch (true) {
      case !!changeValue.day:
        this.setState({
          day: changeValue.day as number
        });
      default:
        this.setState({
          month: changeValue.month,
          year: changeValue.year,
        });
        if (this.props.updateDate) {
          this.props.updateDate({ year: changeValue.year, month: changeValue.month, day: changeValue.day || this.state.day })
        }
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
            <CalendarDetailBody year={this.state.year} month={this.state.month} day={this.state.day}
                                scheduleIconColor={this.state.scheduleIconColor} showSchedule={this.state.showSchedule}
                                schedules={this.state.schedule} updateDate={this.receiveDateChange}/>
          </div>
        </div>
        <div className="schedule-wrapper">
          <Schedule year={this.state.year} month={this.state.month} day={this.state.day} schedule={this.state.schedule} />
        </div>
      </div>
    )
  }
}

export default Calendar;