import * as React from "react";
import LunarCalendarDataService from "../../../../tool/LunarCalendar";
import { IScheduleList } from "../../index.type";
import './Schedule.component.scss';
import { IScheduleProps, IScheduleStates } from "./Schedule.component.type";

class Schedule extends React.Component<IScheduleProps, IScheduleStates> {

  public chineseWeek = ['日', '一', '二', '三', '四', '五', '六'];
  public lunarData = LunarCalendarDataService.getInstance();

  public componentWillMount () {
    const currentDate = new Date(this.props.year, this.props.month - 1, this.props.day);
    const lunarData = this.lunarData.getLunarMonthAndDay(this.props.year, this.props.month, this.props.day);
    this.setState({
      currentDate,
      lunarData
    })
  }

  public render () {
    const createScheduleList = (scheduleList: IScheduleList) => {
      return scheduleList.schedules.map((e, i) => {
        return (
          <li key={i}>
            <div className="time">
              <i className="icon" style={{ backgroundColor: e.iconColor }} /> {`${e.startTime} - ${e.endTime}`}
            </div>
            <div className="description">
              {e.description}
            </div>
          </li>
        )
      })
    }

    const todaySchedule = this.props.schedule.find(e => e.year === this.props.year && e.month === this.props.month && e.day === this.props.day);

    return (
      <div className="schedule">
        <div className="header">
          <div>
            { this.state.currentDate.getFullYear() }-{ this.state.currentDate.getMonth() + 1}-{ this.state.currentDate.getDate() } 星期{this.chineseWeek[this.state.currentDate.getDay()] }
          </div>
          <div className="day">
            { this.state.currentDate.getDate() }
          </div>
          <div>
            { this.state.lunarData.chineseEra.era }年 { this.state.lunarData.chineseEra.chineseZodiacAnimal }年
          </div>
          <div>
            { this.state.lunarData.isLeapYear ? '闰' : '' }{ `${this.state.lunarData.monthStr}${this.state.lunarData.dayStr}` }
          </div>
        </div>
        <div className="list">
          <div className="title">
            今日日程
          </div>
          <ul>
            {
              !!todaySchedule ? (createScheduleList(todaySchedule)) : (
                <li className="empty">暂无日程</li>
              )
            }
          </ul>
        </div>
      </div>
    )
  }

}

export default Schedule;