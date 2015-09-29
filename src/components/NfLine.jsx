import React, { Component, PropTypes } from 'react';
import lineWriter from '../util/lineWriter';
import memoizeForRender from '../util/memoizeForRender';

export default class NfLine extends Component {

  static needsGraph = true

  static propTypes = {
    lineWriter:  PropTypes.func,
    data: PropTypes.array
  }

  static defaultProps = {
    lineWriter: lineWriter,
    data: null
  }

  @memoizeForRender
  get trimmedData() {
    const { 
      graph: { 
        props: { leftX, rightX } 
      }, 
      data 
    } = this.props;
    
    if(data) {
      const minX = Math.min(leftX, rightX);
      const maxX = leftX === minX ? rightX : leftX;
      return data.filter((d, i) => {
        const x = d.x;
        return (minX <=  x && x <= maxX) || // x is between min and max OR
          (0 < i && maxX < x && d[i-1].x <= maxX) || // d is the point just after the max value OR
          (i < data.length - 1 && x < minX && minX <= d[i+1].x) // d is the point just before the min value
      });
    }
  }

  getPath() {
    const { graph, lineWriter } = this.props;
    const data = this.trimmedData;
    if(graph && data) {
      const { scaleX, scaleY } = graph;
      return lineWriter(d => scaleX(d.x), d => scaleY(d.y), data);
    }
    return "M0,0";
  }

  render() {
    return (<g className="nf-line">
      <path className="nf-line-path" d={this.getPath()}/>
    </g>);
  }
}