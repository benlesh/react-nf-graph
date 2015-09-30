import React, { Component, PropTypes } from 'react';

export default class NfYAxis extends Component {

  static needsGraph = true;

  static propTypes = {
    width: PropTypes.number,
    count: PropTypes.number,
    template: PropTypes.func
  }

  static defaultProps = {
    width: 80,
    count: 6
  }

  ticks() {
    const { graph, width, count } = this.props;

    if(graph) {
      const { graphY, scaleY } = graph;
      const x = width - 5;
      return scaleY.ticks(Number(count) || 8, tick => ({
        y: graphY + scaleY(tick),
        value: tick,
        x
      }));
    }
    return [];
  }

  renderTicks() {
    const ticks = this.ticks();
    const { template } = this.props;
    return ticks.map(({x, y, value}, i) => (
      <g key={i} className="nf-y-axis-tick" transform={`translate(${x},${y})`}>
        {template(value, x, y, i)}
      </g>
    ));
  }

  render() {
    return (<g className="nf-y-axis">{this.renderTicks()}</g>);
  }
}