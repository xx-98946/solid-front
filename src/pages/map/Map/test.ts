// import data from "./data.json";

// function getLinePaths() {
//     const list = data.features.filter(item => item.geometry.type == "Point").map(item => item.geometry.coordinates)
//     console.log(JSON.stringify(list));
// }

// getLinePaths()

const base = [
  [114.454478, 37.048592],
  [114.445279, 37.09204],
  [114.445169, 37.066711],
  [114.514826, 37.028807],
  [114.514745, 37.039254],
  [114.490351, 37.039408],
  [114.493798, 37.032645],
  [114.48279, 37.036422],
  [114.335554, 36.854962],
  [114.346161, 36.870261],
  [114.344515, 36.871121],
  [114.459265, 36.911692],
  [114.459205, 36.916329],
];

console.log(
  JSON.stringify(
    base.map((item) => {
      return {
        angle: 0,
        center: item,
      };
    }),
  ),
);
