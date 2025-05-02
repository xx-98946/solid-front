import { Router } from "@solidjs/router";
import { createSignal, lazy, onMount } from "solid-js";
import Home from "$/pages/home";
import NotFounded from "$/pages/404";
import Nav from "$/pages/nav";
import Test from "$/pages/test";
import * as client from "$/api";
const lazyModule = import.meta.glob("$/pages/**/index.tsx");

/**
 * 静态路由
 */
const [getConstRoutes] = createSignal([
  { path: "/", component: Home, title: "首页" },
  { path: "/*", component: NotFounded, title: "404" },
  { path: "/nav", component: Nav, title: "导航" },
  { path: "/test", component: Test, title: "测试" },
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
