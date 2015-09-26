export default function getMousePoint(container, e) {
  var x, y;

  if(e && 'clientX' in e) {
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = e.clientX;
      point.y = e.clientY;
      point = point.matrixTransform(container.getScreenCTM().inverse());
      x = point.x;
      y = point.y;
    } else {
      var rect = container.getBoundingClientRect();
      x = e.clientX - rect.left - container.clientLeft;
      y = e.clientY - rect.top - container.clientTop;
    }
  }

  return {
    x: x,
    y: y,
  };
}