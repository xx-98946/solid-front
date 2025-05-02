import { createSignal, For, onCleanup, onMount } from "solid-js";
import Map from "./Map";
import MapInfo from "./MapInfo";
import MapMouseInfo from "./MapMouseInfo";
import MapLines from "./MapLines";
import linesData from "./linesData.json";
import purpleLines from "./purpleLines.json";
import MapPoints from "./MapPoints";
import pointsData from "./pointsData.json";
import MapIcons from "./MapIcons";
import slashsData from "./slashsData.json";
import MapTexts from "./MapTexts";
import textsData from "./textsData.json";
import MapArrow from "./MapArrow";
import arrowData from "./dotArrow.json";

export default function MapPage() {
  const [getMap, setMap] = createSignal<AMap.Map | undefined>();
  function onLoad(innerMap: AMap.Map) {
    setMap(innerMap);
    // console.log("初始化");
  }
  const center = [114.341994, 36.856636] as [number, number];
  const zoom = 15;
  const plugins = ["AMap.PolylineEditor"];

  function onDone() {
    getMap()?.setFitView();
  }

  return (
    <section class="h-screen w-screen">
      <Map
        viewMode="2D"
        zoom={zoom}
        onLoad={onLoad}
        center={center}
        plugins={plugins}
        zooms={[11, 20]}
      >
        <MapInfo map={getMap()} />
        <MapMouseInfo map={getMap()} />
        <MapLines map={getMap()} paths={linesData} color="red"></MapLines>
        <MapLines map={getMap()} paths={purpleLines} color="purple"></MapLines>
        <MapPoints
          map={getMap()}
          paths={pointsData as [number, number][]}
          radius={7}
        ></MapPoints>

        <MapIcons
          map={getMap()}
          paths={slashsData}
          radius={7}
          onDone={onDone}
        ></MapIcons>
        <MapTexts map={getMap()} paths={textsData} />
        <MapArrow map={getMap()} paths={arrowData} />
      </Map>
    </section>
  );
}
