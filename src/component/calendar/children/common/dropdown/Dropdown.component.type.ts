import { IListData } from "../../../index.type";

export interface IDropdownProps {
  width?: number;
  maxHeight?: number;
  display?: string;
  listData: IListData[];
  globalClickClose?: boolean;
  defaultValue?: string;
  updateValue: (value: string) => void
}

export interface IDropdownStates {
  value: string;
  listVisible: boolean;
}