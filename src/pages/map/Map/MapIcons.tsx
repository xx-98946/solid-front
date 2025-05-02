import { createEffect, createSignal } from "solid-js";

interface IPath {
  angle: number;
  center: number[];
  direction: string;
  content: string;
  offsetX: number;
  offsetY: number;
}

interface IMapPointsProps {
  map?: AMap.Map;
  paths: Array<IPath>;
  radius: number;
  onDone?: () => void;
}
export default function MapPoints(props: IMapPointsProps) {
  createEffect(() => {
    if (props.map) {
      const markers = props.paths.map(drawIcon);
      console.log("??最后一个点", markers.at(-1));
      props.onDone?.();
    }
  });

  function drawIcon(item: IPath) {
    const icon = new AMap.Icon({
      // 图标尺寸
      size: new AMap.Size(88, 4),
      // 图标的取图地址
      image: "/line.svg",
      // 图标所用图片大小
      imageSize: new AMap.Size(4400, 200),
      // 图标取图偏移量
      // imageOffset: new AMap.Pixel(-9, -3),
    });
    const marker = new AMap.Marker({
      position: item.center as [number, number],
      icon: icon,
      angle: item.angle,
      anchor: "center",
      draggable: true,
      map: props.map,
      zIndex: 60,
      // offset: new AMap.Pixel(-13, -30)
    });

    const textMarker = new AMap.Marker({
      position: item.center as [number, number],
      zIndex: 60,
      anchor: "center",
      // draggable: true,
      map: props.map,
      icon: new AMap.Icon({
        image: "/transparent.svg",
        size: new AMap.Size(1, 1),
      }),
      label: {
        direction: item.direction as any,
        offset: new AMap.Pixel(item.offsetX, item.offsetY),
        content: `<div style="font-size:2em;font-weight:600;line-height:1.5em;padding:0.25em; border:2px solid black;background:white;">${item.content}</div>`,
      },
      // offset: new AMap.Pixel(-13, -30)
    });
    // props.map?.add(marker);
    return marker;
  }

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return <></>;
}
