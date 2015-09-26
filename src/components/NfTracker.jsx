import React, { Component } from 'react';
import getMousePoint from '../util/getMousePoint';
import nearestIndexTo from '../util/nearestIndexTo';

export default class NfTracker extends Component {
  static needsGraph = true;

  static defaultProps = {
    radius: 2
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { graph, data } = this.props;
    this._mouseMoveHandler = (e) => {
      const { x, y } = getMousePoint(e.currentTarget, e);
      const scaleX = graph.scaleX();
      const scaleY = graph.scaleY();
      const i = nearestIndexTo(data, scaleX.invert(x), selectX);
      const item = data[i];

      this.setState({ 
        x: scaleX(item.x),  
        y: scaleY(item.y)
      });
    };
    graph.on('contentMouseMove', this._mouseMoveHandler);
  }

  componentWillUnmount() {
    graph.off('contentMouseMove', this._mouseMoveHandler);
  }

  render() {
    const { x = 0, y = 0 } = this.state || {};
    const { radius } = this.props;
    const translate = `translate(${x},${y})`;
    return (<g transform={translate}><circle r={radius} /></g>);
  }
}

function selectX(p) {
  return p.x;
}