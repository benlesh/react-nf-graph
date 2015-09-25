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

  getPath() {
    const { graph, lineWriter, data } = this.props;

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