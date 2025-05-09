import { useData, IType, useComputed } from "$/utils";
import { nanoid } from "nanoid";
import { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type ClassNameValue, twMerge } from "tailwind-merge";

export type IBaseType = IType<
  {
    component: string | Component;
    children: JSX.Element;
    class: ClassNameValue;
    baseClass: ClassNameValue;
    pressTime: number; // 区分长按和点击，默认250毫秒
    id: string; // 唯一标识
    style: {}; // 动态样式
    baseStyle: string; // 基础样式
    title: string; // 文字提示
  },
  {
    onClick?: (event: MouseEvent) => void;
    onClickSelf?: (event: MouseEvent) => void;
    onPress?: (event: MouseEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onDblClick?: (event: MouseEvent) => void;
  }
>;

export type IBaseAttrs<T = {}> = IBaseType["Attrs"] & T;
export type IBaseEvents<T = {}> = IBaseType["Events"] & T;

export function Base(props: IBaseType["Props"]) {
  const data = useData<IBaseType["Attrs"], IBaseType["Events"]>(props);

  const handleMousedown: JSX.EventHandlerUnion<
    HTMLDivElement,
    MouseEvent,
    JSX.EventHandler<HTMLDivElement, MouseEvent>
  > = (event) => {
    data.onMouseDown?.(event);
    const target = event.target;
    const start = Date.now();
    const timer = setTimeout(() => {
      //   console.log("??250ms");
      data.onPress?.(event);
      target?.removeEventListener("mouseup", mouseUp);
    }, data.pressTime.get()!);

    const mouseUp: any = (e: MouseEvent) => {
      const end = Date.now();
      const time = end - start;
      if (time < data.pressTime!.get()!) {
        clearTimeout(timer);
        if (e.target === document.getElementById(data.id.get())) {
          data.onClickSelf?.(e);
        }
        data.onClick?.(e);
      }
    };
    target?.addEventListener("mouseup", mouseUp);
  };

  const mergedClass = useComputed(() =>
    twMerge(data.baseClass?.get(), data.class?.get()),
  );

  const mergedStyle = useComputed(() => {
    return (
      `${data.baseStyle.get()};` +
      Object.entries(data.style.get())
        .map(([key, value]) => {
          return `${key}:${value}`;
        })
        .join(";")
    );
  });

  // createEffect(() => {
  //   console.log("??base data", data);
  // });

  return (
    <Dynamic
      component={data.component?.get()!}
      onmousedown={handleMousedown}
      onDblClick={data.onDblClick}
      class={mergedClass.get()}
      id={data.id.get()}
      style={mergedStyle.get()}
      title={data.title.get()}
    >
      {data.children?.get()}
    </Dynamic>
  );
}

export default Base;

Base.init = () => {
  return {
    component: "div",
    class: "",
    baseClass: "",
    pressTime: 250, // 区分长按和点击，默认250毫秒
    id: nanoid(), // 唯一标识
    children: "",
    baseStyle: "",
    style: {},
    title: "",
  } as IBaseType["Props"];
};
