import { createEffect, createSignal } from "solid-js";

interface IMapPointsProps {
  map?: AMap.Map;
  paths: [number, number][];
  radius: number;
  onDone?: () => void;
}
export default function MapPoints(props: IMapPointsProps) {
  createEffect(() => {
    if (props.map) {
      const points = props.paths.map(drawPoint);
      props.map.on("zoomchange", () => {
        const zoom = props.map?.getZoom();
        points.forEach((point) => {
          point.setRadius(calculateRadius(zoom));
        });
      });
      props.onDone?.();
    }
  });

  // 计算 Circle 的半径（核心逻辑）
  function calculateRadius(zoom: any) {
    // 根据缩放级别调整半径（经验公式，需根据实际效果微调）
    const metersPerPixel =
      (156543.03392 * Math.cos((39.9 * Math.PI) / 180)) / Math.pow(2, zoom);
    return props.radius * metersPerPixel;
  }

  function drawPoint(center: [number, number]) {
    const point = new AMap.Circle({
      center,
      radius: calculateRadius(props.map!.getZoom()),
      strokeWeight: 0,
      fillOpacity: 1,
      fillColor: "green",
      zIndex: 51,
    });
    point.on("click", () => {
      navigator.clipboard.writeText(toString(center));
    });
    props.map?.add(point);
    return point;
  }

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return <></>;
}
