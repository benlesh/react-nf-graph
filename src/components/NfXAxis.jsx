import React, { Component, PropTypes } from 'react';

export default class NfXAxis extends Component {

  static contextTypes = {
    graph: PropTypes.object.isRequired,
    scaleX: PropTypes.func.isRequired,
    scaleY: PropTypes.func.isRequired
  };

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
    const { height, count, template } = this.props;
    const { graph, scaleX } = this.context;
    const y = graph.height - height + 5;
    
    return scaleX.ticks(Number(count) || 8, (tick, i) => {
      const x =  graph.content.x + scaleX(tick),
            value = tick;
      return (
        <g key={i} className="nf-x-axis-tick" transform={`translate(${x},${y})`}>
          {template(value, x, y, i)}
        </g>
      );
    });
  }

  render() {
    return (<g className="nf-x-axis">{this.renderTicks()}</g>);
  }
}