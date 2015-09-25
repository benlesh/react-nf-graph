import React, { Component, PropTypes } from 'react';

export default class NfXAxis extends Component {

  static needsGraph = true;

  static propTypes = {
    height: PropTypes.number,
    count: PropTypes.number,
    template: PropTypes.func
  }

  static defaultProps = {
    height: 20,
    count: 8
  }

  ticks() {
    const { graph, height, count } = this.props;

    if(graph) {
      var xOffset = graph.graphX();
      var scaleX = graph.scaleX();
      var y = graph.props.height - height + 5;
      return scaleX.ticks(Number(count) || 8)
        .map(tick => ({
          x: xOffset + scaleX(tick),
          value: tick,
          y,
        }));
    }
    return [];
  }

  renderTicks() {
    const ticks = this.ticks();
    const { template } = this.props;
    return ticks.map(({x, y, value}, i) => (
      <g key={i} className="nf-x-axis-tick" transform={`translate(${x},${y})`}>
        {template(value, x, y, i)}
      </g>
    ));
  }

  render() {
    return (<g className="nf-x-axis">{this.renderTicks()}</g>);
  }
}