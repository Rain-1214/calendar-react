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
    value: this.props.value || this.props.placeholder || '待选择',
  }

  private liHeight = 24;
  private minScrollComponentRef: React.RefObject<MinScroll>;

  public componentDidMount () {
    this.minScrollComponentRef = React.createRef();
    if (this.props.globalClickClose) {
      let canClose = false;
      document.addEventListener('mousedown', () => {
        canClose = true;
      }, false);
      document.addEventListener('mouseup', () => {
        if (canClose) {
          canClose = false;
          this.setState({
            listVisible: false
          })
        }
      }, false)
    }
  }

  public componentWillReceiveProps (nextProps: IDropdownProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  public triggleOptionList = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    let scrollDistance = 0;
    for (let i = 0; i < this.props.listData.length; i++) {
      if (this.props.listData[i].value === this.state.value) {
        scrollDistance = i * this.liHeight;
        break;
      }
    }
    this.setState({
      listVisible: !this.state.listVisible,
    }, () => {
      (this.minScrollComponentRef.current as MinScroll).setScrollElementDistance(-scrollDistance);
    })
  }

  public updateSelectValue (listData: IListData, event: React.MouseEvent) {
    event.stopPropagation();
    this.setState({
      value: listData.value || this.props.placeholder || '待选择'
    })
    this.props.updateValue(listData.value);
  }

  public stopMouseDownPropagation (event: React.MouseEvent) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  public render () {
    return (
      <div className="dropdown-wrapper" style={{width: this.props.width}}>
        <div className="value" onClick={this.triggleOptionList} onMouseDown={this.stopMouseDownPropagation}>
          {this.state.value}
        </div>
        <span className="dropdown-btn" onClick={this.triggleOptionList} onMouseDown={this.stopMouseDownPropagation}>
          <i className="icon-down" />
        </span>
        <div className="dropdown-list" hidden={!this.state.listVisible}>
          <MinScroll maxHeight={this.props.maxHeight} ref={this.minScrollComponentRef}>
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