import React, { Component, PropTypes } from 'react';
import linearScale from '../util/linearScale';

export default class NfGraph extends Component {

  static defaultProps = {
    linearScale: linearScale,
    width: 400,
    height: 200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    topY: 1,
    bottomY: 0,
    leftX: 0,
    rightX: 1
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
    linearScale:    PropTypes.func
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
        eventHandlers[i].handler.apply(thisArg, args);
      }
    }
  }

  graphHeight() {
    const { height, marginBottom, marginTop } = this.props;
    return height - marginBottom - marginTop;
  }

  graphWidth() {
    const { width, marginLeft, marginRight } = this.props;
    return width - marginLeft - marginRight;
  }

  graphX() {
    return Number(this.props.marginLeft);
  }

  graphY() {
    return Number(this.props.marginTop);
  }

  domainX() {
    const { leftX, rightX } = this.props;
    return [leftX, rightX];
  }

  domainY() {
    const { topY, bottomY } = this.props;
    return [bottomY, topY];
  }

  rangeX() {
    return [0, this.graphWidth()];
  }

  rangeY() {
    return [this.graphHeight(), 0];
  }

  scaleX() {
    return this.props.linearScale(this.domainX(), this.rangeX());
  }

  scaleY() {
    return this.props.linearScale(this.domainY(), this.rangeY());
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