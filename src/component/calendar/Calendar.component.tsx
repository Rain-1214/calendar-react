import * as React from "react";
import { ICalendarProps } from "./Calendar.component.type";

class Calendar extends React.Component<ICalendarProps> {

  constructor(props: ICalendarProps) {
    super(props);
  }

  public render () {
    return (
      <div className="wrapper">
        <h1>calendar</h1>
      </div>
    )
  }
}

export default Calendar;