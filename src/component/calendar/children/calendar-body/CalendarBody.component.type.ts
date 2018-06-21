import { IDateTableData, ISelectDate } from "../../index.type";

export interface ICalendarDetailBodyProps {
  year: number;
  month: number;
  day: number;
  scheduleIconColor: string;
  showSchedule: boolean;
  updateDate?: (selectDate: ISelectDate) => void;
}

export interface ICalendarDetailBodyStates {
  tableData: IDateTableData[][]
}