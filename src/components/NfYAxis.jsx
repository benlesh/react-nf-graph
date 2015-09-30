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

  renderTicks() {
    const { graph, width, count, template } = this.props;

    if(graph) {
      const { graphY, scaleY } = graph;
      const x = width - 5;
      return scaleY.ticks(Number(count) || 8, (tick, i) => {
        const y = graphY + scaleY(tick),
              value = tick;
        return (
          <g key={i} className="nf-y-axis-tick" transform={`translate(${x},${y})`}>
            {template(value, x, y, i)}
          </g>
        ); 
      });
    }
    return [];
  }

  render() {
    return (<g className="nf-y-axis">{this.renderTicks()}</g>);
  }
}