import { IListData } from "../../../index.type";

export interface IDropdownProps {
  width?: number;
  maxHeight?: number;
  display?: string;
  listData: IListData[];
  globalClickClose?: boolean;
  placeholder?: string;
  value: string | number | null;
  updateValue: (value: string | number | null) => void
}

export interface IDropdownStates {
  value: string | number;
  listVisible: boolean;
  scrollDistance: number;
}