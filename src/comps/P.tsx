import { Base, IBaseAttrs, IBaseEvents } from "$/comps";
import { IType, useData } from "$/utils";

type IPType = IType<IBaseAttrs<{}>, IBaseEvents<{}>>;

export function P(props: IPType["Props"]) {
  const data = useData<IPType["Attrs"], IPType["Events"]>(props);

  return <Base {...data}></Base>;
}

P.config = {
  ...Base.config,
} as IPType["Props"];
