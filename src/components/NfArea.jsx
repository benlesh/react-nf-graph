import React, { Component, PropTypes } from 'react';

import NfLine from './NfLine';

export default class NfArea extends NfLine {

  getPathStart() {
    const { data } = this.props;
    if(data && data.length > 0) {
      let { x, y } = data[0];
      let { graph: { bottomY }, scaleX, scaleY } = this.context;
      console.log(bottomY);
      let by = scaleY(bottomY),
          _y = scaleY(y),
          _x = scaleX(x);
      return `M${_x},${by} L${_x},${by} L${_x},${_y} `;
    }
    return '';
  }

  getPath() {
    const { data } = this.props;

    if(data && data.length > 0) {
      const {
        graph: { leftX, rightX, bottomY },
        scaleX,
        scaleY
      } = this.context;

      let path = super.getPath();
      let lx = scaleX(Math.max(leftX, data[0].x));
      let rx = scaleX(Math.min(rightX, data[data.length - 1].x));
      let by = scaleY(bottomY);
      path += `L${rx},${by} L${lx},${by}`;
      return path;
    }
    return 'M0,0';
  }

  render() {
    return (<g className="nf-area">
      <path className="nf-area-path" d={this.getPath()}/>
    </g>);
  }
}