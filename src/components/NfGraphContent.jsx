import React, { Component, PropTypes } from 'react';

export default class NfGraphContent extends Component {
  static contextTypes = {
    graph: PropTypes.object.isRequired
  }

  componentDidMount() {
    const g = this.refs.target;
    const { graph } = this.context;
    this._contentMouseMove = e => {
      graph.trigger('contentMouseMove', this, e);
    };

    this._contentMouseOut = e => {
      graph.trigger('contentMouseOut', this, e);
    };

    g.addEventListener('mousemove', this._contentMouseMove);
    g.addEventListener('mouseout', this._contentMouseOut);
  }

  componentWillUnmount() {
    g.removeEventListener('mousemove', this._contentMouseMove);
    g.removeEventListener('mouseout', this._contentMouseOut);
  }

  render() {
    const { graph: { content } } = this.context;
    return (<g ref="target" transform={`translate(${content.x},${content.y})`}>
      <rect className="nf-graph-content-bg" x="0" y="0" width={content.width} height={content.height}/>
      { this.props.children }
    </g>);
  }
}