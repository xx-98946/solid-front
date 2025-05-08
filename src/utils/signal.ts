import { createMemo, createSignal, type Accessor, type Setter } from "solid-js";
import { ClassNameValue } from "tailwind-merge";

export interface ISignal<T> {
  get: Accessor<T>;
  set: Setter<T>;
  __signal: true;
}

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
 * 定义传参类型
 */
export type ISignalOption<T> = ISignal<T> | T;

/**
 * 生成类
 * @param cb
 * @returns
 */
export function useClass(callBack: () => ClassNameValue) {
  return useComputed(callBack);
}
