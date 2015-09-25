import d3 from 'd3';

export default function lineWriter(xtransform, ytransform) {
  return d3.svg.line().x(xtransform).y(ytransform);
}