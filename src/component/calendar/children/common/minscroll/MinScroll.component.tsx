import * as React from "react";
import './MinScroll.component.scss'
import { IMinScrollProps, IMinScrollStates } from "./MinScroll.component.type";

class MinScroll extends React.Component<IMinScrollProps, IMinScrollStates> {

  public scrollWrapperRef: React.RefObject<HTMLDivElement>;
  public sourceHeight = 0;
  public state = {
    scrollBarDistance: 0,
    scrollElementDistance: 0
  }

  public componentWillMount () {
    this.scrollWrapperRef = React.createRef();
  }

  public componentDidUpdate () {
    this.sourceHeight = ((this.scrollWrapperRef.current as HTMLDivElement).children[0] as HTMLElement).clientHeight;
    // tslint:disable-next-line:no-console
    console.log(this.sourceHeight, ((this.scrollWrapperRef.current as HTMLDivElement).children[0] as HTMLElement));
  }

  public mouseWheelScroll = (event: React.WheelEvent) => {
    // tslint:disable-next-line:no-console
    console.log(this.scrollWrapperRef.current)
  }

  public render () {
    return (
      <div className="min-scroll-bar-wrapper">
        <div className="scroll-wrapper"
             style={{
              maxHeight: this.props.maxHeight,
              top: this.state.scrollElementDistance
             }}
             onWheel={this.mouseWheelScroll}
             ref={this.scrollWrapperRef}>
          {this.props.children}
        </div>
        <div className="scroll-bar">
          <div className="bar"
               style={{
                 top: this.state.scrollBarDistance
               }}/>
        </div>
      </div>
    )
  }
}

export default MinScroll;