export default function nearestIndexTo(arr, val, mappingFn) {
  mappingFn = mappingFn || (x => x);
  let startIndex  = 0;
  let stopIndex = arr.length - 1;
  let middle = (stopIndex + startIndex) / 2;
  let a = Math.floor(middle);
  let b = Math.floor(middle + 1);

  let getItem = function(i){
    return mappingFn(arr[i]);
  };

  let av = getItem(a);
  let bv = getItem(b);

  while(!(av <= val && val <= bv) && startIndex < stopIndex){
    if (val < av){
        stopIndex = middle - 1;
    } else if (val > av){
        startIndex = middle + 1;
    }

    middle = (stopIndex + startIndex) / 2;
    a = Math.max(0, Math.floor(middle));
    b = Math.min(arr.length - 1, Math.floor(middle + 1));
    av = getItem(a);
    bv = getItem(b);
  }

  return (Math.abs(val - av) < Math.abs(val - bv)) ? a : b;
}