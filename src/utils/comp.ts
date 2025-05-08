import { ISignal, useComputed, useSignal } from ".";

export type IAttrs = Record<string | number | symbol, unknown>;
export type IEvents = Record<string | symbol, Function | undefined>;
export type IType<A extends IAttrs, E extends IEvents> = {
  Attrs: A;
  Events: E;
  Props: { [K in keyof A]: ISignal<A[K]> | A[K] } & E;
  PropsWithoutEvents: { [K in keyof A]: ISignal<A[K]> | A[K] };
  Datas: { [K in keyof A]: ISignal<A[K]> } & E;
  DatasWithoutEvents: { [K in keyof A]: ISignal<A[K]> };
};

export function useData<A extends IAttrs, E extends IEvents>(
  props: IType<A, E>["Props"],
): IType<A, E>["Datas"] {
  const result: any = {};
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      result[key] = value;
    } else {
      result[key] = useSignal(value);
    }
  });
  return result;
}
