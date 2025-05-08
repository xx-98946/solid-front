import { Base, IBaseAttrs, IBaseEvents } from "$/comps";
import { IType, useData } from "$/utils";

type IButtonType = IType<IBaseAttrs<{}>, IBaseEvents<{}>>;

export function Button(props: IButtonType["Props"]) {
  const data = useData<IButtonType["Attrs"], IButtonType["Events"]>(props);

  return <Base {...data}></Base>;
}

Button.init = () => {
  return {
    ...Base.init(),
    type: "button",
  } as IButtonType["Props"];
};
