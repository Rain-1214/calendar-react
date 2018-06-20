
export interface ILunarData {
  month: number;
  monthStr: string;
  day: number;
  dayStr: string;
  currentMonthDaysNum: number;
  isLeapMonth: boolean;
  isLeapYear: boolean;
  chineseEra: IChineseEra;
}

export interface IListData {
  label: string;
  value: any;
}


export interface IDateTableData {
  year: number;
  month: number;
  day: number;
  lunarDay: number;
  lunarDayStr: string;
  isWeekend: boolean;
  isNotInCurrentMonth: boolean;
  hasSchedule: boolean;
}

export interface ISelectDate {
  year: number;
  month: number;
  day: number;
}

export interface IChineseEra {
  heavenlyStems: number;
  earthlyBranches: number;
  era: string;
  chineseZodiacAnimal: string;
}

export interface ISchedule {
  startTime: string;
  endTime: string;
  description: string;
  iconColor: string;
}

export interface IScheduleList {
  year: number;
  month: number;
  day: number;
  schedules: ISchedule[];
}
