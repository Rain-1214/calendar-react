
export interface ICalendarDetailHeaderProps {
  year?: number;
  month?: number;
  updateDate?: (updateValue: { year: number, month: number }) => void;
  returnToday: () => void;
}

export interface ICalendarDetailHeaderStates {
  year: number;
  month: number;
}