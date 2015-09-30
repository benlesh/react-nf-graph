import React, { Component, PropTypes } from 'react';
import lineWriter from '../util/lineWriter';
import memoizeForRender from '../util/memoizeForRender';
import NfLine from './NfLine';

export default class NfArea extends NfLine {

  getPath() {
    const {
      data,
      graph: {
        props: { leftX, rightX, bottomY },
        scaleX,
        scaleY
      }
    } = this.props;

    if(data && data.length > 0) {
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