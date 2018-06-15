import * as React from "react";
import './Dropdown.component.scss'

import { IListData } from "../../../index.type";
import MinScroll from "../minscroll/MinScroll.component";
import { IDropdownProps, IDropdownStates } from "./Dropdown.component.type";

class Dropdown extends React.Component<IDropdownProps, IDropdownStates> {

  public static defaultProps = {
    display: 'inline-block',
    globalClickClose: true,
    maxHeight: Number.MAX_SAFE_INTEGER,
    width: 80,
  }

  public state = {
    listVisible: false,
    value: this.props.defaultValue || '待选择',
  }

  public componentDidMount () {
    if (this.props.globalClickClose) {
      let canClose = false;
      document.addEventListener('mousedown', () => {
        canClose = true;
      });
      document.addEventListener('mouseup', () => {
        if (canClose && this.state.listVisible) {
          canClose = false;
          this.setState({
            listVisible: false
          })
        }
      })
    }
  }

  public triggleOptionList = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.setState({
      listVisible: !this.state.listVisible
    })
  }

  public updateSelectValue (listData: IListData, event: React.MouseEvent)  {
    event.stopPropagation();
    this.props.updateValue(listData.value);
  }

  public render () {
    return (
      <div className="dropdown-wrapper" style={{width: this.props.width}}>
        <div className="value" onMouseUp={this.triggleOptionList}>
          {this.state.value}
        </div>
        <span className="dropdown-btn" onMouseUp={this.triggleOptionList}>
          <i className="icon-down" />
        </span>
        <div className="dropdown-list" hidden={!this.state.listVisible}>
          <MinScroll maxHeight={this.props.maxHeight}>
            <ul>
              {this.props.listData.map((listData, i) => (
                <li key={i} onClick={this.updateSelectValue.bind(this, listData)}>{listData.label}</li>
              ))}
            </ul>
          </MinScroll>
        </div>
      </div>
    )
  }
}

export default Dropdown;