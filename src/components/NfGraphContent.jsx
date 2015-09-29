import React, { Component } from 'react';

export default class NfGraphContent extends Component {
  static needsGraph = true;

  componentDidMount() {
    const g = this.refs.target.getDOMNode();

    this._contentMouseMove = e => {
      this.props.graph.trigger('contentMouseMove', this, e);
    };

    this._contentMouseOut = e => {
      this.props.graph.trigger('contentMouseOut', this, e);
    };

    g.addEventListener('mousemove', this._contentMouseMove);
    g.addEventListener('mouseout', this._contentMouseOut);
  }

  componentWillUnmount() {
    g.removeEventListener('mousemove', this._contentMouseMove);
    g.removeEventListener('mouseout', this._contentMouseOut);
  }

  renderChildren() {
    const { children, graph } = this.props;

    return React.Children.map(children, function(child) {
      return  child.type.needsGraph ? React.cloneElement(child, { graph: graph }) : child;
    }.bind(this));
  }

  render() {
    const { graph } = this.props;
    return (<g ref="target" transform={`translate(${graph.graphX},${graph.graphY})`}>
      <rect className="nf-graph-content-bg" x="0" y="0" width={graph.graphWidth} height={graph.graphHeight}/>
      {this.renderChildren()}
    </g>);
  }
}