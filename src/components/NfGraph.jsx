import React, { Component, PropTypes } from 'react';
import linearScale from '../util/linearScale';
import memoizeForRender from '../util/memoizeForRender';

export default class NfGraph extends Component {

  static defaultProps = {
    linearScale: linearScale,
    width: 400,
    height: 200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    topY: 10,
    bottomY: 0,
    leftX: 0,
    rightX: 10,
    ticksSizeX: 50,
    ticksSizeY: 50
  }

  static propTypes = {
    width:          PropTypes.number,
    height:         PropTypes.number,
    marginBottom:   PropTypes.number,
    marginTop:      PropTypes.number,
    marginLeft:     PropTypes.number,
    marginRight:    PropTypes.number,
    topY:           PropTypes.number,
    bottomY:        PropTypes.number,
    leftX:          PropTypes.number,
    rightX:         PropTypes.number,
    linearScale:    PropTypes.func,
    tickSizeX:      PropTypes.number,
    tickSizeY:      PropTypes.number
  }

  @memoizeForRender
  get ticksX() {
    const graphWidth = this.graphWidth;
    const scaleX = this.scaleX;
    const tickSizeX = this.props.tickSizeX;

    return scaleX.ticks(Math.round(graphWidth / tickSizeX));
  }

  on(name, handler) {
    const eventHandlers = this.eventHandlers = (this.eventHandlers || []);
    eventHandlers.push({ name, handler });
  }

  off(name, handler) {
    const { eventHandlers } = this;
    if(eventHandlers) {
      for(let i = eventHandlers.length - 1; i--;) {
        let { ehName, ehHandler } = eventHandlers[i];
        if(ehName === name && ehHandler === ehHandler) {
          eventHandlers.splice(i, 1);
        }
      }
    }
  }

  trigger(name, thisArg, ...args) {
    const { eventHandlers } = this;
    thisArg = thisArg || this;
    if(eventHandlers) {
      const len = eventHandlers.length;
      for(let i = 0; i < len; i++) {
        let eventHandler = eventHandlers[i];
        if(eventHandler.name === name) {
          eventHandlers[i].handler.apply(thisArg, args);
        }
      }
    }
  }

  @memoizeForRender
  get graphHeight() {
    const { height, marginBottom, marginTop } = this.props;
    return height - marginBottom - marginTop;
  }

  @memoizeForRender
  get graphWidth() {
    const { width, marginLeft, marginRight } = this.props;
    return width - marginLeft - marginRight;
  }

  @memoizeForRender
  get graphX() {
    return Number(this.props.marginLeft);
  }

  @memoizeForRender
  get graphY() {
    return Number(this.props.marginTop);
  }

  @memoizeForRender
  get domainX() {
    const { leftX, rightX } = this.props;
    return [leftX, rightX];
  }

  @memoizeForRender
  get domainY() {
    const { topY, bottomY } = this.props;
    return [bottomY, topY];
  }

  @memoizeForRender
  get rangeX() {
    return [0, this.graphWidth];
  }

  @memoizeForRender
  get rangeY() {
    return [this.graphHeight, 0];
  }

  @memoizeForRender
  get scaleX() {
    return this.props.linearScale(this.domainX, this.rangeX);
  }

  @memoizeForRender
  get scaleY() {
    return this.props.linearScale(this.domainY, this.rangeY);
  }

  renderChildren() {
    return React.Children.map(this.props.children, function(child) {
      return child.type.needsGraph ? React.cloneElement(child, { graph: this }) : child
    }.bind(this));
  }

  render() {
    const { width, height } = this.props;

    return (<div><svg className="nf-graph" width={width} height={height}>
      <rect className="nf-graph-bg" x="0" y="0" width={width} height={height}/>
      {this.renderChildren()}
    </svg></div>);
  }
}