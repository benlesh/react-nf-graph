import React, { Component, PropTypes } from 'react';
import memoizeForRender from '../util/memoizeForRender';

export default class NfLine extends Component {
  static contextTypes = {
    graph: PropTypes.object.isRequired,
    scaleX: PropTypes.func.isRequired,
    scaleY: PropTypes.func.isRequired
  }

  static propTypes = {
    data: PropTypes.array
  }

  static defaultProps = {
    data: null
  }

  @memoizeForRender
  get trimmedData() {
    const { data } = this.props;
    const { leftX, rightX } = this.context.graph;
    
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

  getPathStart() {
    const { data } = this.props;
    if(data && data.length > 0) {
      const { x, y } = data[0];
      const { scaleX, scaleY } = this.context;
      let _x = scaleX(x),
          _y = scaleY(y);
      return `M${_x},${_y} `;
    }
    return '';
  }

  getPath() {
    const { data } = this.props;
    const { scaleX, scaleY, graph: { leftX, rightX } } = this.context;
    let result = this.getPathStart();

    if(data) {
      const minX = Math.min(leftX, rightX);
      const maxX = leftX === minX ? rightX : leftX;
      const len = data.length;

      for(let i = 0; i < len; i++) {
        let d = data[i];
        let x = d.x;

        if(d.x > maxX && data[i-1].x > maxX) {
          break;
        }

        if(d.x < minX && data[i+1].x < minX) {
          continue;
        }

        // build the result string
        let px = scaleX(d.x),
            py = scaleY(d.y);

        result += ` L${px},${py}`;
      }
    }

    return result || 'M0,0';
  }

  render() {
    return (<g className="nf-line">
      <path className="nf-line-path" d={this.getPath()}/>
    </g>);
  }
}