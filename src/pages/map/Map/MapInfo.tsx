import { createEffect, createSignal } from "solid-js";

interface IMapInfoProps {
  map?: AMap.Map;
}
export default function MapInfo(props: IMapInfoProps) {
  const [getZoom, setZoom] = createSignal(0);
  const [getCenter, setCenter] = createSignal<AMap.LngLat | null>(null);
  createEffect(() => {
    if (props.map) {
      const { map } = props;
      console.log("初始化 info map");
      getMapInfo();
      map.on("moveend", getMapInfo);
      map.on("zoomend", getMapInfo);
    }
  });

  function getMapInfo() {
    const zoom = props.map!.getZoom();
    const center = props.map!.getCenter();
    setZoom(zoom);
    setCenter(center);
  }

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return (
    <div class="fixed z-30 bg-white p-2 top-0 right-0">
      <div>当前级别：{getZoom()}</div>
      <div>当前中心点：{toString(getCenter())}</div>
    </div>
  );
}
