export class Point {
  constructor(x, y) {
    this._vector = [x, y];
  }

  get x() {
    return this._vector[0];
  }

  get y() {
    return this._vector[1];
  }

  get vector() {
    return this._vector;
  }
}

export class Path {
  constructor(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  transform(matrix) {
    const resultData = [];
    const { data } = this;
    const len = data.length;
    for(let i = 0; i < len; i += 2) {
      let x = data[i],
          y = data[i + 1];

      resultData.push(matrix.transformX(x), matrix.transformY(y));
    }
  }
}

/**
  Creates a {Path} from a series fo {Point} objects.
  @param {Point} ...pts a series of points
  @returns {Path}
*/
Path.fromPoints = function fromPoints(...pts) {
  const arr = [];
  return new Path(arr.concat.apply(arr, pts.map(pt => pt.data)));
};

/**
  Creates a {Path} from any array of data.
  @param {Array} data the array of data to create the {Path} from
  @param {function} xSelector a function to select the x value for each point from each
    item in the array
  @param {function} ySelector a function to select the y value for each point from each
    item in the array
  @param {any} thisArg the context to provide to the xSelector and ySelector functions
  @returns {Path}
*/
Path.fromData = function(data, xSelector, ySelector, thisArg) {
  thisArg = thisArg || this;
  return new Path(data.reduce((p, d, i, data) => {
    p.push(xSelector.call(thisArg, d, i, data), ySelector.call(thisArg, d, i, data))
  }, []));
};

export class Matrix2D {
  constructor(data) {
    this.data = data || [1 0
                         0 1
                         0 0];
  }

  invert() {
    const data = this.data;
    const [ a, b,
            c, d,
            tx, ty ] = data;

    // determinent
    let dt = a * d - b * c;
    if(!dt){
      return null;
    }

    dt = 1.0 / dt;

    data[0] = d * dt;
    data[1] = -b * dt;
    data[2] = -c * dt;
    data[3] = a * dt;
    data[4] = (c * ty - d * tx) * dt;
    data[5] = (b * tx - a * ty) * dt;
  }

  scale(vx, vy) {
    const data = this.data;
    const [ a, b,
            c, d,
            tx, ty ] = data;

    data[0] = a * vx; 
    data[1] = b * vy;
    data[2] = c * vx; 
    data[3] = d * vy;
    data[4] = tx * vx; 
    data[5] = ty * vy;
  }

  translate(x, y) {
    const data = this.data;
    data[4] += x;
    data[5] += y;
  }

  rotate(degrees) {
    const data = this.data;
    const rad = degrees * Math.PI / 180;
    const st = Math.sin(rad),
          ct = Math.cos(rad);

    const [ a, b,
            c, d,
            tx, ty ] = data;

    data[0] =  a * ct + b * st;
    data[1] = -a * st + b * ct;
    data[2] =  c * ct + d * st;
    data[3] = -c * st + d * ct;
    data[4] =  tx * ct + ty * st;
    data[5] = -tx * st + ty * ct;
  }

  clone() {
    return new Matrix2D(this.data.slice());
  }

  transformX(x) {
    const data = this.data;
    return data[0] * x + data[2] * y + data[4]
  }


  transformY(x) {
    const data = this.data;
    return data[1] * x + data[3] * y + data[5]
  }

  transformPointData(pointData) {
    const [x, y] = pointData;
    const [ a, b,
            c, d,
            tx, ty ] = this.data;

    return [a * x + c * y + tx,
            b * x + d * y + ty];
  }

  toString() {
    return this.data.toString();
  }
}