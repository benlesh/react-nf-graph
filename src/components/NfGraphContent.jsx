import React, { Component } from 'react';

export default class NfGraphContent extends Component {
  static needsGraph = true;

  renderChildren() {
    const { children, graph } = this.props;

    return React.Children.map(children, function(child) {
      return  child.type.needsGraph ? React.cloneElement(child, { graph: graph }) : child;
    }.bind(this));
  }

  render() {
    const { graph } = this.props;
    return (<g transform={`translate(${graph.graphX()},${graph.graphY()})`}>
      <rect className="nf-graph-content-bg" x="0" y="0" width={graph.graphWidth()} height={graph.graphHeight()}/>
      {this.renderChildren()}
    </g>);
  }
}