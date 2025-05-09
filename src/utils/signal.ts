import {
  createMemo,
  createSignal,
  JSX,
  type Accessor,
  type Setter,
} from "solid-js";
import { ClassNameValue } from "tailwind-merge";

export interface ISignal<T> {
  get: Accessor<T>;
  set: Setter<T>;
  __signal: true;
}

/**
 * 定义传参类型
 */
export type ISignalOption<T> = ISignal<T> | T;

/**
 * 判断是不是信号
 * @param value
 * @returns
 */
export function isSignal<T>(value: ISignalOption<T>) {
  // @ts-ignore
  if (typeof value == "object" && value != null && value.__signal) {
    return true;
  }
  return false;
}

/**
 * 生成状态信号
 * @param value
 * @returns
 */
export function useSignal<T>(value: T | ISignal<T>): ISignal<T> {
  if (isSignal(value)) {
    return value as ISignal<T>;
  }
  const [getValue, setValue] = createSignal(value as T);

  return {
    get: getValue,
    set: setValue,
    __signal: true,
  };
}

/**
 * 生成对象
 */
export function useObject<T extends Object>(initValue: T) {
  const signal = useSignal(initValue);
  const update = (newValue: Partial<T>) => {
    const mergedValue = {
      ...signal.get(),
      ...newValue,
    } as any;
    signal.set(mergedValue);
  };
  return {
    ...signal,
    update,
  };
}

/**
 * 生成样式
 * @param initValue
 * @returns
 */
export const useStyle = useObject<JSX.CSSProperties>;

/**
 * 生成计算状态信号
 * @param callBack
 * @returns
 */
export function useComputed<T>(callBack: () => T) {
  const computedValue = useSignal(callBack());
  const setValue = computedValue.set;
  createMemo(() => {
    const newValue = callBack();
    setValue(newValue as any);
  });

  // @ts-ignore
  computedValue.set = () => {
    setValue((v) => v);
  };

  return computedValue;
}

/**
 * 生成样式类
 */
export const useComputedClass = useComputed<ClassNameValue>;

/**
 * 生成样式
 */
export const useComputedStyle = useComputed<JSX.CSSProperties>;
