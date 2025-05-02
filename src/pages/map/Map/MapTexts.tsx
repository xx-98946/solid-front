import { createEffect, createSignal } from "solid-js";

interface IPath {
  angle: number;
  center: number[];
  direction: string;
  content: string;
  anchor: string;
}

interface IMapPointsProps {
  map?: AMap.Map;
  paths?: Array<IPath>;
  onDone?: () => void;
}
export default function MapPoints(props: IMapPointsProps) {
  const [getFeatures, setFeatures] = createSignal([] as AMap.Marker<any>[]);

  createEffect(() => {
    console.log("??texts", getFeatures());
  });
  createEffect(() => {
    if (props.map) {
      props.map.on("rightclick", (e) => {
        const { lng, lat } = e.lnglat;
        console.log("?lng, lat", [lng, lat]);
        const feature = drawText({
          angle: 0,
          center: [lng, lat],
          direction: "right",
          content: Math.random().toString(),
          anchor: "top-center",
        });

        setFeatures(() => {
          return [...getFeatures(), feature];
        });
        // console.log("右键",.lat: 36.868957
        //   ​​
        //   lng: 114.3651);
      });
      if (props.paths) {
        props.paths.map(drawText);
      }
    }
  });

  function drawText(item: IPath) {
    const marker = new AMap.Text({
      position: item.center as [number, number],
      zIndex: 53,
      angle: item.angle,
      anchor: item.anchor as any,
      // @ts-ignore
      style: {
        color: "#3c1fa3",
        border: "none",
        background: "transparent",
        textAlign: "center",
        fontWeight: 600,
      },
      text: item.content,
      title: toString(item.center),
      draggable: true,
      // // offset: new AMap.Pixel(-13, -30),
      // icon: null,
    });

    // marker.setLabel({
    //   direction: item.direction as any,
    //   offset: new AMap.Pixel(0, 10),
    //   content: `<div style="font-size:1em;color:purple;">${item.content}</div>`,
    // });
    props.map?.add(marker);
    return marker;
  }

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return <></>;
}
