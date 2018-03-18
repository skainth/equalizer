// Not the best implementation of deep copy
// but should be fine for the demo
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export {deepClone};
