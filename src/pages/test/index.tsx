import { Div } from "$/comps";
import { useComputed, useSignal } from "$/utils";
import { nanoid } from "nanoid";
import OpenSeadragon from "openseadragon";
import { onMount } from "solid-js";
import "./test.css";
export default function Test() {
  const id = nanoid();

  const width = useSignal(960);
  const radio = 1080 / 1920;
  const height = useComputed(() => width.get() * radio);

  onMount(() => {
    const viewer = OpenSeadragon({
      id: id,
      debugMode: true,
      debugGridColor: ["white"],
      showNavigator: true,
      showHomeControl: false,
      showFullPageControl: false,
      showZoomControl: false,
      tileSources: {
        type: "image",
        url: "LD01.png",
      },
    });

    function addOverLay(item: { type: string; paths: number[] }) {
      var canvas = document.createElement("canvas");
      canvas.className = "highlight";
      canvas.id = nanoid();
      viewer.addOverlay({
        element: canvas,
        // @ts-ignore
        location: new OpenSeadragon[item.type](...item.paths),
      });
    }

    function drawAll() {
      [
        // {
        //   type: "Rect",
        //   paths: [0, 0, 1, radio],
        // },
        {
          type: "Rect",
          paths: [0, 0, 0.5, 0.5 * radio],
        },
      ].forEach(addOverLay);
    }

    drawAll();
  });
  return (
    <Div
      {...Div.init()}
      style={`width:${width.get()}px;height:${height.get()}px;`}
      class="border-4 border-blue-600"
      id={id}
    ></Div>
  );
}
