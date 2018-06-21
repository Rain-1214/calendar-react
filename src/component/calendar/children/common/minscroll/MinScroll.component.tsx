import * as React from "react";
import ClassNameConverter from "../../../../../tool/ClassNameObj2Str";
import './MinScroll.component.scss'
import { IMinScrollProps, IMinScrollStates } from "./MinScroll.component.type";

class MinScroll extends React.Component<IMinScrollProps, IMinScrollStates> {

  public static defaultProps = {
    maxHeight: Number.MAX_SAFE_INTEGER
  }

  /**
   * 指向滚动元素
   */
  public scrollWrapperRef: React.RefObject<HTMLDivElement>;
  /**
   * 记录元素总高度
   */
  public sourceHeight = 0;
  /**
   * 滚动条可滚动的最大距离
   */
  public maxScrollBarDistance = 0;
  /**
   * 元素可滚动的最大距离
   */
  public maxScrollElementDistance = 0;
  /**
   * 滚动条的滚动滑块的高度
   */
  public scrollBarHeight = 30;
  /**
   * 每次滚动距离
   */
  public scrollStep = 50;
  /**
   * 鼠标移动时是否可以拖动滚动滑块
   */
  public canMove = false;
  /**
   * 记录拖动开始时鼠标的位置
   */
  public startMoveMouseDistance = 0;
  /**
   * 记录拖拽开始时滚动的位置
   */
  public startMoveScrollDistance = 0;
  public state = {
    scrollBarDistance: 0,
    scrollElementDistance: 0
  }

  public componentWillMount () {
    this.scrollWrapperRef = React.createRef();
    document.addEventListener('mousemove', (event: MouseEvent) => {
      event.preventDefault();
      if (this.canMove) {
        this.setScrollBarDistance(this.startMoveScrollDistance + (event.clientY - this.startMoveMouseDistance));
      }
    }, false)
    document.addEventListener('mouseup', (event: MouseEvent) => {
      this.canMove = false;
    }, false)
  }

  public componentDidUpdate () {
    const current = this.scrollWrapperRef.current as HTMLElement;
    if (this.props.maxHeight && current.clientHeight !== 0 && current.clientHeight !== this.sourceHeight) {
      this.sourceHeight = current.clientHeight;
      this.maxScrollElementDistance = this.sourceHeight - this.props.maxHeight;
      this.maxScrollBarDistance = this.props.maxHeight - this.scrollBarHeight;
      this.setScrollElementDistance(this.state.scrollElementDistance);
    }
  }

  public mouseWheelScroll = (event: React.WheelEvent) => {
    const tempStep = event.deltaY > 0 ? -this.scrollStep : this.scrollStep;
    const tempScrollDistance = this.state.scrollElementDistance + tempStep;
    this.setScrollElementDistance(tempScrollDistance);
  }

  public clickScrollWrapper = (event: React.MouseEvent) => {
    event.stopPropagation();
    const scrollDistance = event.nativeEvent.offsetY - (this.scrollBarHeight / 2);
    this.setScrollBarDistance(scrollDistance);
  }

  public stopPropagation (event: React.MouseEvent) { 
    event.stopPropagation();
    event.nativeEvent.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  public startMove = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.canMove = true;
    this.startMoveMouseDistance = event.nativeEvent.clientY;
    this.startMoveScrollDistance = this.state.scrollBarDistance;
  }

  public endMove = () => {
    this.canMove = false;
  } 
  
  public setScrollElementDistance = (scrollDistance: number) => {
    let scrollElementDistance = scrollDistance;
    scrollElementDistance = scrollElementDistance > 0 ? 0 : scrollElementDistance < -this.maxScrollElementDistance ? -this.maxScrollElementDistance : scrollElementDistance;
    const scrollElementPercent = Math.abs(scrollElementDistance) / this.maxScrollElementDistance;
    const scrollBarDistance = scrollElementPercent * this.maxScrollBarDistance;
    this.setState({
      scrollBarDistance,
      scrollElementDistance
    })
  }

  public setScrollBarDistance = (scrollDistance: number) => {
    let scrollBarDistance = scrollDistance;
    scrollBarDistance = scrollBarDistance < 0 ? 0 : scrollBarDistance > this.maxScrollBarDistance ? this.maxScrollBarDistance : scrollBarDistance;
    const scrollBarPercent = scrollBarDistance / this.maxScrollBarDistance;
    const scrollElementDistance = -this.maxScrollElementDistance * scrollBarPercent;
    this.setState({
      scrollBarDistance,
      scrollElementDistance
    })
  }

  public render () {
    const hasScrollClassList = {
      "hasScroll": this.sourceHeight > (this.props.maxHeight as number),
      "min-scroll-bar-wrapper": true,
    }
    return (
      <div className={ClassNameConverter.translateClassNameObj2Str(hasScrollClassList)}
           onWheel={this.mouseWheelScroll}>
        <div className="scroll-wrapper"
             style={{
              maxHeight: this.props.maxHeight,
             }}>
            <div className="scroll-element"
                 style= {{
                  top: this.state.scrollElementDistance
                 }}
                 ref={this.scrollWrapperRef}>
              {this.props.children}
            </div>
        </div>
        <div className="scroll-bar"
             onClick={this.clickScrollWrapper}
             onMouseDown={this.stopPropagation}>
          <div className="bar"
               style={{
                 top: this.state.scrollBarDistance
               }}
               onClick={this.stopPropagation}
               onMouseDown={this.startMove}
               onMouseUp={this.endMove}/>
        </div>
      </div>
    )
  }

}

export default MinScroll;