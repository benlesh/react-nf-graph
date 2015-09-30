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

  renderTicks() {
    const { graph, height, count, template } = this.props;

    if(graph) {
      const { graphX, scaleX } = graph;
      const y = graph.props.height - height + 5;
      return scaleX.ticks(Number(count) || 8, (tick, i) => {
        const x =  graphX + scaleX(tick),
              value = tick;
        return (
          <g key={i} className="nf-x-axis-tick" transform={`translate(${x},${y})`}>
            {template(value, x, y, i)}
          </g>
        );
      });
    }
    return [];
  }

  render() {
    return (<g className="nf-x-axis">{this.renderTicks()}</g>);
  }
}