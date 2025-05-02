// import Page from "./Map/index";
import { createSignal, onMount } from "solid-js";
import Map from "./Map/Map";
import MapInfo from "./Map/MapInfo";
export default function () {
  const [getMap, setMap] = createSignal<AMap.Map | undefined>();

  function onLoad(innerMap: AMap.Map) {
    setMap(innerMap);
    // console.log("初始化");
  }

  onMount(() => {
    console.log("parent");
  });

  return (
    <div class="w-screen h-screen">
      <Map
        onLoad={onLoad}
        center={[115.950911, 39.02695]}
        zoom={18}
        zooms={[2, 23]}
      >
        <MapInfo map={getMap()} />
      </Map>
    </div>
  );
}
