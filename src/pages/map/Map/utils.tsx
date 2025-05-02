export function drawLine(path: number[][]) {}

/**
 * 获取当前地图中心位置
 * @param map
 * @returns
 */
export function getCenter(map: AMap.Map) {
  const center = map.getCenter();
  return center;
}

/**
 * 获取当前地图级别
 * @param map
 * @returns
 */
export function getZoom(map: AMap.Map) {
  const zoom = map.getZoom();
  return zoom;
}
