import { Base, Div, IBaseAttrs, IBaseEvents } from "$/comps";
import { IType, useData } from "$/utils";

type IBlurType = IType<
  IBaseAttrs<{
    src: string;
  }>,
  IBaseEvents<{}>
>;

export function Blur(props: IBlurType["Props"]) {
  const data = useData<IBlurType["Attrs"], IBlurType["Events"]>(props);

  return (
    <Div {...data} baseClass={["relative"]}>
      <img src={data.src.get()} class="absolute w-full h-full" />
      {/* 蒙层 */}
      <Div
        {...Div.init()}
        class="absolute size-full z-in backdrop-blur-md bg-gray-900/10"
      ></Div>
      {/*  */}
      <Div {...Div.init()} class="absolute size-full z-20  overflow-auto">
        {data.children.get()}
      </Div>
    </Div>
  );
}

Blur.init = () => {
  return {
    ...Base.init(),
    src: "",
  } as IBlurType["Props"];
};
