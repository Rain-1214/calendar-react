import { IScheduleList } from "./index.type";

export interface ICalendarProps {
    width?: number;
    schedule?: IScheduleList[];
    showSchedule?: boolean;
    scheduleIconColor?: string;
    showToday?: boolean;
}