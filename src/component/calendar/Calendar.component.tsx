import * as React from "react";
import "./Calendar.component.scss";

import { ICalendarProps, ICalendarStates } from "./Calendar.component.type";
import CalendarDetailBody from "./children/calendar-body/CalendarBody.component";
import CalendarDetailHeader from "./children/calendar-header/CalendarHeader.component";

class Calendar extends React.Component<ICalendarProps, ICalendarStates> {

  constructor(props: ICalendarProps) {
    super(props);
    this.state = {
      schedule: props.schedule || [],
      scheduleIconColor: props.scheduleIconColor || '#f60',
      showSchedule: props.showSchedule || false,
      showToday: props.showToday || true,
      width: props.width || 550,
    }
  }

  public render () {
    return (
      <div className="calendar-wrapper" style={{width: this.state.width}}>
        <div className="calendar-detail-wrapper">
          <div className="header">
            <CalendarDetailHeader />
          </div>
          <div className="body">
            <CalendarDetailBody />
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