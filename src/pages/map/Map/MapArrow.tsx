import { createEffect, createSignal } from "solid-js";

interface IPath {
  angle: number;
  anchor: string;
  center: number[];
  direction: string;
  content: string;
  offsetX: number;
  offsetY: number;
}

interface IMapArrowsProps {
  map?: AMap.Map;
  paths: Array<IPath>;
  onDone?: () => void;
}
export default function MapArrows(props: IMapArrowsProps) {
  createEffect(() => {
    if (props.map) {
      const markers = props.paths.map(drawArrow);
      console.log("??最后一个点", markers.at(-1));
      props.onDone?.();
    }
  });

  function drawArrow(item: IPath) {
    const icon = new AMap.Icon({
      // 图标尺寸
      size: new AMap.Size(60, 60),
      // 图标的取图地址
      image: "/dotArrow.svg",
      // 图标所用图片大小
      imageSize: new AMap.Size(60, 60),
      // 图标取图偏移量
      // imageOffset: new AMap.Pixel(-9, -3),
    });
    const marker = new AMap.Marker({
      position: item.center as [number, number],
      icon: icon,
      angle: item.angle,
      anchor: item.anchor as any,
      draggable: true,
      map: props.map,
      zIndex: 60,
    });
    new AMap.Text({
      position: item.center as [number, number],
      zIndex: 61,
      anchor: item.anchor as any,
      // @ts-ignore
      style: {
        color: "blue",
        border: "2px dashed blue",
        background: "white",
        textAlign: "center",
        fontWeight: 500,
        padding: "4px",
      },
      text: item.content,
      title: toString(item.center),
      offset: new AMap.Pixel(item.offsetX, item.offsetY),
      draggable: true,
      map: props.map,
    });
    return marker;
  }

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return <></>;
}
