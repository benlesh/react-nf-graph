import React, { Component, PropTypes } from 'react';

export default class NfYAxis extends Component {
  static contextTypes = {
    graph: PropTypes.object.isRequired,
    scaleX: PropTypes.func.isRequired,
    scaleY: PropTypes.func.isRequired
  }

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
    const { width, count, template } = this.props;
    const { graph: { content }, scaleY } = this.context;
    const x = width - 5;

    return scaleY.ticks(Number(count) || 8, (tick, i) => {
      const y = content.y + scaleY(tick),
            value = tick;
      return (
        <g key={i} className="nf-y-axis-tick" transform={`translate(${x},${y})`}>
          {template(value, x, y, i)}
        </g>
      ); 
    });
  }

  render() {
    return (<g className="nf-y-axis">{this.renderTicks()}</g>);
  }
}