import { IScheduleList, ISelectDate } from "./index.type";

export interface ICalendarProps {
    width?: number;
    schedule?: IScheduleList[];
    showSchedule?: boolean;
    scheduleIconColor?: string;
    showToday?: boolean;
    defaultYear?: number;
    defaultMonth?: number;
    defaultDay?: number;
    updateDate?: (selectDate: ISelectDate) => void;
}

export interface ICalendarStates {
    width: number;
    schedule: IScheduleList[];
    showSchedule: boolean;
    scheduleIconColor: string;
    showToday: boolean;
    year: number;
    month: number;
    day: number;
}