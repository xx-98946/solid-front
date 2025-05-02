import { nanoid } from "nanoid";
import { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type ClassNameValue, twMerge } from "tailwind-merge";

export interface IBaseProps {
  component?: string | Component;
  children?: JSX.Element;
  class?: ClassNameValue;
  onClick?: (event: MouseEvent) => void;
  onClickSelf?: (event: MouseEvent) => void;
  onPress?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;

  time?: number; // 区分长按和点击，默认250毫秒
}

export function Base(props: IBaseProps) {
  const handleMousedown: JSX.EventHandlerUnion<
    HTMLDivElement,
    MouseEvent,
    JSX.EventHandler<HTMLDivElement, MouseEvent>
  > = (event) => {
    props.onMouseDown?.(event);
    const target = event.target;
    const start = Date.now();
    const timer = setTimeout(() => {
      //   console.log("??250ms");
      props.onPress?.(event);
      target?.removeEventListener("mouseup", mouseUp);
    }, props.time || 250);

    const mouseUp: any = (e: MouseEvent) => {
      const end = Date.now();
      const time = end - start;
      if (time < (props.time || 250)) {
        clearTimeout(timer);
        if (e.target === document.getElementById(id)) {
          props.onClickSelf?.(e);
        }
        props.onClick?.(e);
      }
    };
    target?.addEventListener("mouseup", mouseUp);
  };

  const id = nanoid();

  return (
    <Dynamic
      component={props.component || "div"}
      onmousedown={handleMousedown}
      onDblClick={props.onDblClick}
      class={twMerge(props.class)}
      id={id}
    >
      {props.children}
    </Dynamic>
  );
}

export default Base;
