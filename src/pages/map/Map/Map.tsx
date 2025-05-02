import AMapLoader from "@amap/amap-jsapi-loader";
import { nanoid } from "nanoid";
import { createSignal, onCleanup, onMount } from "solid-js";
import type { JSX } from "solid-js";
import "./index.css";

interface IMapProps {
  children?: JSX.Element; // 插入的内容
  onLoad?: (map: AMap.Map) => void; // 初始化执行的操作
  center?: [number, number]; // 地图中心点
  plugins?: string[]; // 插件列表
  viewMode?: "2D" | "3D"; // 类型
  zoom?: number; // 初始缩放级别
  zooms?: [number, number]; // 缩放范围
}
export default function Map(props: IMapProps) {
  const id = nanoid();
  const plugins = props.plugins
    ? ["AMap.Scale"].concat(props.plugins)
    : ["AMap.Scale"];
  let [getMap, setMap] = createSignal<AMap.Map | null>(null);

  function initAMap() {
    AMapLoader.load({
      key: "7dedc5707fb079db460d1b9f802ca2c4",
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins,
    })
      .then((AMap) => {
        // console.log("??AMap", AMap);
        const map = new AMap.Map(id, {
          // 设置地图容器id
          viewMode: props.viewMode || "2D", // 是否为3D地图模式
          zoom: props.zoom || 16, // 初始化地图级别
          center: props.center || [116.397428, 39.90923], // 初始化地图中心点位置
          zooms: props.zooms || [1, 20],
        });
        setMap(map);
        props.onLoad?.(map);
      })
      .catch((e) => {
        console.error("初始化地图出错了", e);
      });
  }

  onMount(() => {
    console.log("child");
    initAMap();
  });

  onCleanup(() => {
    getMap()?.destroy();
  });

  return (
    <section class="size-full">
      <div id={id} class="size-full">
        {props.children}
      </div>
    </section>
  );
}
