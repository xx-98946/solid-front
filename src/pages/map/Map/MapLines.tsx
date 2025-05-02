import { createEffect, createSignal } from "solid-js";

interface IMapLinesProps {
  map?: AMap.Map;
  paths: number[][][];
  color: string;
}
export default function MapLines(props: IMapLinesProps) {
  createEffect(() => {
    if (props.map) {
      const features = props.paths.map(drawLine);
      console.log("??线", features);
      features.forEach((feature) => {
        feature.on("click", (e) => {
          console.log("??line", feature.getPath());
        });
      });
    }
  });

  function drawLine(path: number[][]) {
    const polyline = new AMap.Polyline({
      path,
      strokeColor: props.color,
      strokeOpacity: 1,
      strokeWeight: 7,
      lineJoin: "round",
      lineCap: "round",
      zIndex: 50,
    });
    props.map?.add(polyline);
    return polyline;
  }

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return <></>;
}
