import { ILunarData, IScheduleList } from "../../index.type";

export interface IScheduleProps {
  year: number;
  month: number;
  day: number;
  schedule: IScheduleList[]
}

export interface IScheduleStates {
  currentDate: Date;
  lunarData: ILunarData;
}