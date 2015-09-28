import React, { Component, PropTypes } from 'react';
import lineWriter from '../util/lineWriter';

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

  getTrimmedData() {
    const { 
      graph: { 
        props: { leftX, rightX } 
      }, 
      data 
    } = this.props;
    
    if(data) {
      const minX = Math.min(leftX, rightX);
      const maxX = leftX === minX ? rightX : leftX;
      console.log(leftX, rightX);
      return data.filter((d, i) => {
        const x = d.x;
        return (minX <=  x && x <= maxX) || // x is between min and max OR
          (0 < i && maxX < x && d[i-1].x <= maxX) || // d is the point just after the max value OR
          (i < data.length - 1 && x < minX && minX <= d[i+1].x) // d is the point just before the min value
      });
    }
    return [];
  }

  getPath() {
    const { graph, lineWriter } = this.props;
    const data = this.getTrimmedData();
    if(graph && data) {
      var scaleX = graph.scaleX();
      var scaleY = graph.scaleY();

      var lineFn = d3.svg.line()
        .x(d => scaleX(d.x))
        .y(d => scaleY(d.y));

      return lineFn(data);
    }

    return "M0,0";
  }

  render() {
    return (<g className="nf-line">
      <path className="nf-line-path" d={this.getPath()}/>
    </g>);
  }
}