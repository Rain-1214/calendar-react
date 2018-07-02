import * as React from "react";
import ClassNameConverter from "../../../../tool/ClassNameObj2Str";
import LunarCalendarDataService from "../../../../tool/LunarCalendar";
import { IDateTableData } from "../../index.type";
import './CalendarBody.component.scss'
import { ICalendarDetailBodyProps, ICalendarDetailBodyStates } from "./CalendarBody.component.type";

class CalendarDetailBody extends React.Component<ICalendarDetailBodyProps, ICalendarDetailBodyStates> {

  public lunarData = LunarCalendarDataService.getInstance();
  public year = 0;
  public month = 0;
  
  public state = {
    tableData: []
  }

  public componentWillMount () {
    const { year, month } = this.props;
    this.year = year;
    this.month = month;
    this.createTableData(year, month);
  }

  public componentWillReceiveProps (nextProps: ICalendarDetailBodyProps) {
    if (nextProps.year !== this.year || nextProps.month !== this.month) {
      this.year = nextProps.year || this.year;
      this.month = nextProps.month || this.month;
      this.createTableData(this.year, this.month);
    }
  }

  public createTableData (year: number, month: number) {
    const tableData: IDateTableData[][] = [];

    const prevMonthLastDayDate = new Date(year, month - 1, 0);
    const currentMonthLastDayDate = new Date(year, month, 0);
    const nextMonthFirstDayDate = new Date(year, month, 1);
    const tableTdSum = prevMonthLastDayDate.getDay() + currentMonthLastDayDate.getDate();
    const tableTrs = Math.ceil(tableTdSum / 7);
    let lunarData = this.lunarData.getLunarMonthAndDay(year, month, 1);
    let lunarDay = lunarData.day;
    let day = 1;
    if (prevMonthLastDayDate.getDay() !== 0) {
      tableData.push(this.addPrevMonthTableData(prevMonthLastDayDate));
    }
    for (let i = 0; i < tableTrs; i++) {
      if (!tableData[i]) {
        tableData[i] = [];
      }
      const currentTr = tableData[i];
      for (let j = currentTr.length; currentTr.length < 7; j++) {
        currentTr.push({
          day,
          hasSchedule: this.checkHasSchedule(year, month ,day),
          isNotInCurrentMonth: false,
          isWeekend: j >= 5,
          lunarDay,
          lunarDayStr: this.lunarData.translateDayNumToCalendarStr(lunarDay),
          month,
          year,
        })
        day++;
        lunarDay++;
        if (lunarDay > lunarData.currentMonthDaysNum) {
          lunarData = this.lunarData.getLunarMonthAndDay(year, month, day);
          lunarDay = lunarData.day;
        }
        if (day > currentMonthLastDayDate.getDate()) {
          break;
        }
      }
    }
    if (tableData[tableData.length - 1].length < 7) {
      this.addNextMonthTableData(nextMonthFirstDayDate, tableData[tableData.length - 1]);
    }
    this.setState({
      tableData,
    })
  }

  public addPrevMonthTableData (prevMonthLastDayDate: Date): IDateTableData[] {
    const tempArray: IDateTableData[] = [];
    const [ year, month ] = [ prevMonthLastDayDate.getFullYear(), prevMonthLastDayDate.getMonth() + 1 ]
    let day = prevMonthLastDayDate.getDate();
    const lunarData = this.lunarData.getLunarMonthAndDay(year, month, day);
    let lunarDay = lunarData.day;
    let week = prevMonthLastDayDate.getDay() === 0 ? 7 : prevMonthLastDayDate.getDay();
    for (let i = week; i > 0; i--) {
      tempArray.unshift({
        day,
        hasSchedule: this.checkHasSchedule(year, month, day),
        isNotInCurrentMonth: true,
        isWeekend: week-- >= 6,
        lunarDay,
        lunarDayStr: this.lunarData.translateDayNumToCalendarStr(lunarDay),
        month,
        year,
      })
      day--;
      lunarDay--;
      if (lunarDay <= 0) {
        lunarDay = this.lunarData.getLunarMonthAndDay(year, month, day).day;
      }
    }
    return tempArray;
  }

  public addNextMonthTableData (nextMonthFirstDayDate: Date, lastTrData: IDateTableData[]) {
    const [ year, month ] = [ nextMonthFirstDayDate.getFullYear(), nextMonthFirstDayDate.getMonth() + 1 ];
    let day = 1;
    const lunarData = this.lunarData.getLunarMonthAndDay(year, month, 1);
    let lunarDay = lunarData.day;
    let week = this.getDateWeek(nextMonthFirstDayDate);
    for (let i = lastTrData.length; i < 7; i++) {
      lastTrData.push({
        day,
        hasSchedule: this.checkHasSchedule(year, month, day),
        isNotInCurrentMonth: true,
        isWeekend: week++ >= 6,
        lunarDay,
        lunarDayStr: this.lunarData.translateDayNumToCalendarStr(lunarDay),
        month,
        year
      })
      day++;
      lunarDay++;
      if (lunarDay > lunarData.currentMonthDaysNum) {
        lunarDay = 1
      }
    }
  }

  public checkHasSchedule (year: number, month: number, day: number): boolean {
    if (!this.props.schedules) {
      return false;
    }
    return !!this.props.schedules.find(e => e.year === year && e.month === month && e.day === day);
  }

  public selectDate (data: IDateTableData) {
    if (this.props.updateDate) {
      const { startYear, endYear } = this.lunarData.getScopeOfLunarYear();
      if (data.year < startYear || data.year > endYear) {
        return;
      }
      this.props.updateDate({ year: data.year, month: data.month, day: data.day });
    }
  }

  public render () {
    const today = new Date();
    const createTr = (tableData: IDateTableData[][]) => {
      return (
        tableData.map((e, i) => (
          <tr key={i}>
            {createTd(e)}
          </tr>
        ))
      )
    }

    const createTd = (trData: IDateTableData[]) => {
      return trData.map((e, i) => {
        const classObj = {
          "active": e.year === this.props.year && e.month === this.props.month && e.day === this.props.day,
          "day-wrapper": true,
          "isNotInCurrentMonth": e.isNotInCurrentMonth,
          "isWeekend": e.isWeekend,
          "today": e.year === today.getFullYear() && e.month === today.getMonth() + 1 && e.day === today.getDate(),
        }
        return (
          <td key={i} onClick={this.selectDate.bind(this, e)}>
            <div className={ClassNameConverter.translateClassNameObj2Str(classObj)}>
              <span className="number">
                {e.day}
              </span>
              <span className="lunar-text">
                {e.lunarDayStr}
              </span>
              {
                this.props.showSchedule ? (
                  <div className="schedule-icon">
                    {
                      e.hasSchedule ? (<i style={{
                        backgroundColor: this.props.scheduleIconColor
                      }} />) : null
                    }
                  </div>
                ) : null
              }
            </div>
          </td>
        )
      })
    }

    return (
      <div className="body-wrapper">
        <table>
          <tbody>
            <tr>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
              <th>日</th>
            </tr>
            {createTr(this.state.tableData)}
          </tbody>
        </table>
      </div>
    )
  }

  private getDateWeek (date: Date) {
    const week = date.getDay();
    return week === 0 ? 7 : week;
  }
}

export default CalendarDetailBody;