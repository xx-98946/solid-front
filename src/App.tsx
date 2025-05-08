import { Router } from "@solidjs/router";
import { createSignal, lazy, onMount } from "solid-js";
import * as client from "$/api";
const lazyModule = import.meta.glob("$/pages/**/index.tsx");

/**
 * 静态路由
 */
const [getConstRoutes] = createSignal([
  { path: "/", component: lazy(() => import("$/pages/home")), title: "首页" },
  { path: "/*", component: lazy(() => import("$/pages/404")), title: "404" },
  {
    path: "/test",
    component: lazy(() => import("$/pages/test")),
    title: "测试",
  },
]);

const [getDynamicRoutes, setDynamicRoutes] = createSignal([] as any[]);

/**
 * 计算出的最终路由
 * @returns
 */
const routes = () => {
  return [
    ...getConstRoutes(),
    ...getDynamicRoutes().map((item) => {
      const { component, ...rest } = item;
      const componentPath = component.replace(/^\$/, "/src");
      return {
        ...rest,
        component: lazy(lazyModule[componentPath] as any),
      };
    }),
  ];
};

export default function APP() {
  onMount(async () => {
    /**
     * 动态路由
     */
    const dynamicRoutes = await client.apiRoutes();
    setDynamicRoutes(dynamicRoutes);
  });
  return <Router>{routes()}</Router>;
}
