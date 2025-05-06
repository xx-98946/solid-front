import { Base, IBaseAttrs, IBaseEvents } from "$/comps";
import { IType, useData } from "$/utils";

type IDivType = IType<IBaseAttrs<{}>, IBaseEvents<{}>>;

export function Div(props: IDivType["Props"]) {
  const data = useData<IDivType["Attrs"], IDivType["Events"]>(props);

  return <Base {...data}></Base>;
}

Div.config = {
  ...Base.config,
} as IDivType['Props'];
