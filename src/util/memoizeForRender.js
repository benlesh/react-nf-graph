const memoized = new WeakMap();

/**
memoizes a property until next `render()` call.
*/
export default function memoizeForRender(target, name, descriptor) {
  const getter = descriptor.get, setter = descriptor.set;

  if(!target.__memoizeSetup) {
    const render = target.render;
    target.render = function() {
      clearMemoizationFor(target);
      const result = render.apply(this, arguments);
      return result;
    };
    target.__memoizeSetup = true;
  }

  descriptor.get = function() {
    const table = memoizationFor(this);
    if (name in table) { return table[name]; }
    return table[name] = getter.call(this);
  }

  descriptor.set = function(val) {
    let table = memoizationFor(this);
    setter.call(this, val);
    table[name] = val;
  }
}

function memoizationFor(obj) {
  let table = memoized.get(obj);
  if (!table) { table = Object.create(null); memoized.set(obj, table); }
  return table;
}

function clearMemoizationFor(obj) {
  memoized.delete(obj);
}