export default function range(start, stop, step, project, thisArg) {
  thisArg = thisArg || this;
  const stepScale = scaleToZero(step);
  const _start = stepScale * start,
        _stop = stepScale * stop,
        _step = stepScale * step,
        results = [];
  for(let v = _start, i = 0; v < stop; v += _step, i++) {
    results.push(project.call(this, v / stepScale, i));
  }
  return results;
}

function scaleToZero(x) {
  let s = 1;
  while((s * x) % 1 !== 0) {
    s *= 10;
  }
  return s;
}