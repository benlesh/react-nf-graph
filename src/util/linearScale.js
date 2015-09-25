import d3 from 'd3';

export default function linearScale(domain, range) {
  return d3.scale.linear().domain(domain).range(range);
}