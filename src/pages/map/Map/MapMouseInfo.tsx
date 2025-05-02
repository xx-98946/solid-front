import { createEffect, createSignal } from "solid-js";

interface IMapMouseInfoProps {
  map?: AMap.Map;
}
export default function MapMouseInfo(props: IMapMouseInfoProps) {
  const [getCenter, setCenter] = createSignal<AMap.LngLat | null>(null);
  createEffect(() => {
    if (props.map) {
      const { map } = props;
      map.on("click", async function (e) {
        setCenter([e.lnglat.getLng(), e.lnglat.getLat()] as any);
        await navigator.clipboard.writeText(
          `[${e.lnglat.getLng()}, ${e.lnglat.getLat()}]`,
        );
      });
    }
  });

  function toString(o: any) {
    return JSON.stringify(o);
  }

  return (
    <div class="fixed z-30 bg-white p-2 bottom-0 right-0">
      <div>鼠标点击位置：{toString(getCenter())}</div>
    </div>
  );
}
